export type ContentBlock =
  | { type: "heading"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string };

export function parseContentBlocks(body: string): ContentBlock[] {
  let headingCount = 0;
  return body
    .trim()
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) {
        headingCount += 1;
        return {
          type: "heading",
          id: `section-${headingCount}`,
          text: block.slice(3).trim(),
        };
      }
      if (block.startsWith("- ")) {
        const lines = block.split("\n");
        if (
          lines.some((line) => !line.startsWith("- ") || !line.slice(2).trim())
        ) {
          throw new Error(
            "Content lists must contain non-empty, single-line items.",
          );
        }
        return {
          type: "list",
          items: lines.map((line) => line.slice(2).trim()),
        };
      }
      const image = block.match(/^!\[([^\]]+)\]\((\/case-studies\/[^\s)]+)\)$/);
      if (image) return { type: "image", alt: image[1], src: image[2] };
      if (/^(?:#|!\[|[-*] |```)/.test(block)) {
        throw new Error(
          "Unsupported content block. Use headings, paragraphs, lists or local images.",
        );
      }
      return { type: "paragraph", text: block.replace(/\n/g, " ") };
    });
}
