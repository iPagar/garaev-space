interface ProjectMetadata {
  title: string;
  description: string;
  image: string;
  screenshots: string[];
}

function extractJsonLd(html: string): {
  name?: string;
  description?: string;
  image?: string;
  screenshots?: string[];
} | null {
  const regex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches = Array.from(html.matchAll(regex));

  for (const match of matches) {
    try {
      const data = JSON.parse(match[1].trim());
      const item = Array.isArray(data) ? data[0] : data;

      if (item["@type"] === "SoftwareApplication") {
        const screenshots = item.screenshot || item.screenshots || [];
        return {
          name: item.name,
          description: item.description,
          image: item.image,
          screenshots: Array.isArray(screenshots)
            ? screenshots
                .map((s: string | { url?: string }) =>
                  typeof s === "string" ? s : s.url || ""
                )
                .filter(Boolean)
            : [],
        };
      }
    } catch {}
  }

  return null;
}

function extractIcon(html: string): string | null {
  const containerRegex =
    /<div[^>]*class=["'][^"']*app-icon-contianer[^"']*["'][^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi;
  const matches = Array.from(html.matchAll(containerRegex));

  for (const match of matches) {
    const srcsetRegex = /srcset=["']([^"']+)["']/gi;
    const srcsetMatches = Array.from(match[0].matchAll(srcsetRegex));

    for (const srcsetMatch of srcsetMatches) {
      const urls = srcsetMatch[1]
        .split(",")
        .map((item) => item.trim().split(/\s+/)[0])
        .filter((url) => url.startsWith("http"));

      let bestUrl: string | null = null;
      let bestSize = 0;

      for (const url of urls) {
        const sizeMatch = url.match(/(\d+)x(\d+)/);
        if (sizeMatch) {
          const size = parseInt(sizeMatch[1], 10);
          if (size > bestSize) {
            bestUrl = url;
            bestSize = size;
          }
        }
      }

      if (bestUrl) return bestUrl;
    }
  }

  return null;
}

function extractScreenshots(html: string): string[] {
  const regex =
    /https?:\/\/is[0-9]-ssl\.mzstatic\.com\/image\/thumb\/[^"'\s]+\.(jpg|jpeg|png|webp)/gi;
  const matches = Array.from(html.matchAll(regex));
  const screenshots: string[] = [];

  for (const match of matches) {
    const url = match[0];
    if (
      !url.includes("Placeholder") &&
      !url.includes("AppIcon") &&
      !url.includes("icon")
    ) {
      screenshots.push(url);
    }
  }

  const screenshotMap = new Map<string, { url: string; size: number }>();

  for (const url of screenshots) {
    const sizeMatch = url.match(/(\d+)x(\d+)/);
    if (sizeMatch) {
      const width = parseInt(sizeMatch[1], 10);
      const height = parseInt(sizeMatch[2], 10);
      if (width < 200 || height < 200) continue;
    }

    const basePathMatch = url.match(
      /^(.+\/[^\/]+\.(png|jpg|jpeg|webp))\/\d+x\d+/i
    );
    const basePath = basePathMatch ? basePathMatch[1] : url;
    const size = sizeMatch
      ? parseInt(sizeMatch[1], 10) * parseInt(sizeMatch[2], 10)
      : 0;

    const existing = screenshotMap.get(basePath);
    if (!existing || size > existing.size) {
      screenshotMap.set(basePath, { url, size });
    }
  }

  return Array.from(screenshotMap.values())
    .map((s) => s.url)
    .slice(0, 5);
}

function extractOpenGraphMetadata(html: string): {
  title?: string;
  description?: string;
  image?: string;
} {
  const ogTitleMatch = html.match(
    /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i
  );
  const ogDescriptionMatch = html.match(
    /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i
  );
  const ogImageMatch = html.match(
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i
  );

  return {
    title: ogTitleMatch ? ogTitleMatch[1] : undefined,
    description: ogDescriptionMatch ? ogDescriptionMatch[1] : undefined,
    image: ogImageMatch ? ogImageMatch[1] : undefined,
  };
}

function extractFavicon(html: string): string | null {
  // apple-touch-icon (лучшее качество)
  const appleTouchIcon = html.match(
    /<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i
  );
  if (appleTouchIcon) return appleTouchIcon[1];

  // обычный favicon
  const favicon = html.match(
    /<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i
  );
  if (favicon) return favicon[1];

  return null;
}

function extractStandardMetadata(html: string): {
  title?: string;
  description?: string;
} {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const descriptionMatch = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i
  );

  return {
    title: titleMatch ? titleMatch[1] : undefined,
    description: descriptionMatch ? descriptionMatch[1] : undefined,
  };
}

export async function fetchProjectMetadata(
  url: string
): Promise<ProjectMetadata> {
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
  const isAppStore = url.includes("apps.apple.com");

  if (isAppStore) {
    // Обработка App Store страниц
    const jsonLd = extractJsonLd(html);

    return {
      title: jsonLd?.name || "",
      description: jsonLd?.description || "",
      image: extractIcon(html) || jsonLd?.image || "",
      screenshots: jsonLd?.screenshots?.length
        ? jsonLd.screenshots
        : extractScreenshots(html),
    };
  } else {
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
