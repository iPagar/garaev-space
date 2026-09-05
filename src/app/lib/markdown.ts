interface ParsedFrontmatter {
  frontmatter: Record<string, unknown>;
  body: string;
}

function parseFrontmatterValue(value: string) {
  const trimmedValue = value.trim();

  if (trimmedValue === "true") return true;
  if (trimmedValue === "false") return false;

  if (trimmedValue.startsWith("[") && trimmedValue.endsWith("]")) {
    return trimmedValue
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  return trimmedValue.replace(/^["']|["']$/g, "");
}

function parseFrontmatterLine(
  accumulator: Record<string, unknown>,
  line: string,
) {
  const separatorIndex = line.indexOf(":");
  if (separatorIndex === -1) {
    return accumulator;
  }

  const key = line.slice(0, separatorIndex).trim();
  const value = line.slice(separatorIndex + 1);
  accumulator[key] = parseFrontmatterValue(value);
  return accumulator;
}

export function parseFrontmatter(source: string): ParsedFrontmatter {
  if (!source.startsWith("---\n")) {
    throw new Error("Markdown file is missing frontmatter.");
  }

  const endIndex = source.indexOf("\n---\n", 4);
  if (endIndex === -1) {
    throw new Error("Markdown frontmatter is not closed.");
  }

  const rawFrontmatter = source.slice(4, endIndex);
  const body = source.slice(endIndex + 5).trim();

  return {
    frontmatter: rawFrontmatter
      .split("\n")
      .reduce<Record<string, unknown>>(parseFrontmatterLine, {}),
    body,
  };
}
