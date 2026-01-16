interface ProjectMetadata {
  title: string;
  description: string;
  image: string;
}

function extractMetaTag(html: string, property: string): string | null {
  const ogRegex = new RegExp(
    `<meta\\s+(?:property|name)=["']${property}["']\\s+content=["']([^"']+)["']`,
    "i"
  );
  const match = html.match(ogRegex);
  return match ? match[1] : null;
}

function extractTitle(html: string): string | null {
  const jsonLd = extractJsonLd(html);
  if (jsonLd?.name) return jsonLd.name;

  const ogTitle = extractMetaTag(html, "og:title");
  if (ogTitle) return ogTitle;

  const titleRegex = /<title[^>]*>([^<]+)<\/title>/i;
  const match = html.match(titleRegex);
  return match ? match[1].trim() : null;
}

function extractJsonLd(html: string): {
  name?: string;
  description?: string;
  image?: string;
} | null {
  const jsonLdRegex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches = Array.from(html.matchAll(jsonLdRegex));
  if (matches.length === 0) return null;

  for (const match of matches) {
    try {
      const jsonData = JSON.parse(match[1].trim());
      const data = Array.isArray(jsonData) ? jsonData[0] : jsonData;
      const type = data["@type"];

      if (type === "SoftwareApplication") {
        return {
          name: data.name,
          description: data.description,
          image: data.image,
        };
      }
    } catch (error) {
      console.error("Error parsing JSON-LD:", error);
    }
  }

  return null;
}

function extractDescription(html: string): string | null {
  const jsonLd = extractJsonLd(html);
  if (jsonLd?.description) return jsonLd.description;

  const ogDesc = extractMetaTag(html, "og:description");
  if (ogDesc) return ogDesc;

  const metaDesc = extractMetaTag(html, "description");
  if (metaDesc) return metaDesc;

  return null;
}

function extractImage(html: string, baseUrl: string): string | null {
  const jsonLd = extractJsonLd(html);
  if (jsonLd?.image) {
    const image = jsonLd.image;
    if (image.startsWith("http")) return image;
    if (image.startsWith("//")) return `https:${image}`;
    if (image.startsWith("/")) {
      const url = new URL(baseUrl);
      return `${url.origin}${image}`;
    }
    return `${baseUrl}/${image}`;
  }

  const ogImage = extractMetaTag(html, "og:image");
  if (ogImage) {
    if (ogImage.startsWith("http")) return ogImage;
    if (ogImage.startsWith("//")) return `https:${ogImage}`;
    if (ogImage.startsWith("/")) {
      const url = new URL(baseUrl);
      return `${url.origin}${ogImage}`;
    }
    return `${baseUrl}/${ogImage}`;
  }

  const twitterImage = extractMetaTag(html, "twitter:image");
  if (twitterImage) {
    if (twitterImage.startsWith("http")) return twitterImage;
    if (twitterImage.startsWith("//")) return `https:${twitterImage}`;
    if (twitterImage.startsWith("/")) {
      const url = new URL(baseUrl);
      return `${url.origin}${twitterImage}`;
    }
    return `${baseUrl}/${twitterImage}`;
  }

  return null;
}

export async function fetchProjectMetadata(
  url: string
): Promise<ProjectMetadata> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 86400 }, // Кэш на 24 часа
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();

    const title = extractTitle(html) || "Project";
    const description = extractDescription(html) || "";
    const image = extractImage(html, url) || "";

    return {
      title,
      description,
      image,
    };
  } catch (error) {
    console.error("Error fetching metadata for", url, error);
    return {
      title: new URL(url).hostname,
      description: "",
      image: "",
    };
  }
}
