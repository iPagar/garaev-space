interface ProjectMetadata {
  title: string;
  description: string;
  image: string;
  screenshots: string[];
}

function extractOpenGraphMetadata(html: string): {
  title?: string;
  description?: string;
  image?: string;
} {
  const ogTitleMatch = html.match(
    /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i,
  );
  const ogDescriptionMatch = html.match(
    /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i,
  );
  const ogImageMatch = html.match(
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
  );

  return {
    title: ogTitleMatch ? ogTitleMatch[1] : undefined,
    description: ogDescriptionMatch ? ogDescriptionMatch[1] : undefined,
    image: ogImageMatch ? ogImageMatch[1] : undefined,
  };
}

function extractLinkAttribute(tag: string, attribute: string): string | null {
  const attributeMatch = tag.match(
    new RegExp(`${attribute}\\s*=\\s*["']([^"']+)["']`, "i"),
  );

  return (
    attributeMatch?.[1]
      ?.replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">") ?? null
  );
}

function getIconKind(rel: string): "icon" | "apple-touch-icon" | null {
  const relTokens = rel.toLowerCase().split(/\s+/).filter(Boolean);

  if (relTokens.includes("apple-touch-icon")) {
    return "apple-touch-icon";
  }

  if (relTokens.includes("icon")) {
    return "icon";
  }

  return null;
}

function parseIconSize(sizes: string | null): number {
  if (!sizes) return 0;

  const normalizedSizes = sizes.trim().toLowerCase();
  if (normalizedSizes === "any") {
    return Number.MAX_SAFE_INTEGER;
  }

  let largestSize = 0;

  for (const sizeMatch of normalizedSizes.matchAll(/(\d+)x(\d+)/g)) {
    const width = Number(sizeMatch[1]);
    const height = Number(sizeMatch[2]);

    largestSize = Math.max(largestSize, width, height);
  }

  return largestSize;
}

function extractFavicon(html: string): string | null {
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];

  let fallbackUrl: string | null = null;
  let bestUrl: string | null = null;
  let bestSize = -1;
  let bestPriority = -1;

  for (const tag of linkTags) {
    const rel = extractLinkAttribute(tag, "rel");
    const href = extractLinkAttribute(tag, "href");

    if (!rel || !href) continue;

    const iconKind = getIconKind(rel);
    if (!iconKind) continue;

    if (!fallbackUrl) {
      fallbackUrl = href;
    }

    const size = parseIconSize(extractLinkAttribute(tag, "sizes"));
    const priority = iconKind === "icon" ? 1 : 0;

    if (size > bestSize || (size === bestSize && priority > bestPriority)) {
      bestUrl = href;
      bestSize = size;
      bestPriority = priority;
    }
  }

  return bestUrl ?? fallbackUrl;
}

function extractStandardMetadata(html: string): {
  title?: string;
  description?: string;
} {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const descriptionMatch = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i,
  );

  return {
    title: titleMatch ? titleMatch[1] : undefined,
    description: descriptionMatch ? descriptionMatch[1] : undefined,
  };
}

export async function fetchProjectMetadata(
  url: string,
): Promise<ProjectMetadata> {
  const isAppStore = url.includes("apps.apple.com");

  if (isAppStore) {
    // Официальный iTunes Lookup API вместо парсинга HTML
    const idFromSlug = url.match(/\/id(\d+)/)?.[1];
    const idFromPath = url.match(/\/app\/(\d+)(?:\?|$)/)?.[1];
    const id = idFromSlug ?? idFromPath;
    if (!id) {
      throw new Error(`Could not extract App Store ID from URL: ${url}`);
    }
    const lookupRes = await fetch(`https://itunes.apple.com/lookup?id=${id}`, {
      next: { revalidate: 86400 },
    });
    if (!lookupRes.ok) {
      throw new Error(`iTunes Lookup failed: ${lookupRes.status}`);
    }
    const lookup = (await lookupRes.json()) as {
      resultCount: number;
      results?: Array<{
        trackName?: string;
        description?: string;
        artworkUrl512?: string;
        artworkUrl100?: string;
        screenshotUrls?: string[];
        ipadScreenshotUrls?: string[];
      }>;
    };
    const app = lookup.results?.[0];
    if (!app) {
      throw new Error(`App not found for ID: ${id}`);
    }
    const screenshots =
      app.screenshotUrls?.slice(0, 5) ??
      app.ipadScreenshotUrls?.slice(0, 5) ??
      [];
    return {
      title: app.trackName ?? "",
      description: app.description ?? "",
      image: app.artworkUrl512 ?? app.artworkUrl100 ?? "",
      screenshots,
    };
  }

  const response = await fetch(url, {
    next: { revalidate: 86400 },
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  const html = await response.text();

  {
    // Обработка вебсайтов
    const ogMetadata = extractOpenGraphMetadata(html);
    const standardMetadata = extractStandardMetadata(html);
    const baseUrl = new URL(url);

    // Иконка — favicon
    let iconUrl = extractFavicon(html) || "";
    if (iconUrl && !iconUrl.startsWith("http")) {
      iconUrl = new URL(iconUrl, baseUrl).toString();
    }

    // Обложка — og:image
    let coverUrl = ogMetadata.image || "";
    if (coverUrl && !coverUrl.startsWith("http")) {
      coverUrl = new URL(coverUrl, baseUrl).toString();
    }

    return {
      title: ogMetadata.title || standardMetadata.title || "",
      description: ogMetadata.description || standardMetadata.description || "",
      image: iconUrl,
      screenshots: coverUrl ? [coverUrl] : [],
    };
  }
}
