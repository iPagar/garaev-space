import { promises as fs } from "node:fs";
import path from "node:path";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");
const MARKDOWN_EXTENSION = ".md";
const WORDS_PER_MINUTE = 200;

interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  body: string;
  readingTime: string;
}

export type MarkdownBlock =
  | { type: "heading"; content: string; level: 2 | 3 }
  | { type: "paragraph"; content: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "blockquote"; content: string }
  | { type: "code"; content: string; language: string };

interface ParsedFrontmatter {
  frontmatter: Record<string, unknown>;
  body: string;
}

function getPostFilePath(slug: string) {
  return path.join(BLOG_DIRECTORY, `${slug}${MARKDOWN_EXTENSION}`);
}

function getSlugFromFileName(fileName: string) {
  return fileName.replace(/\.md$/, "");
}

function isMarkdownFile(fileName: string) {
  return fileName.endsWith(MARKDOWN_EXTENSION);
}

function parseFrontmatterValue(value: string) {
  const trimmedValue = value.trim();

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

function parseFrontmatter(source: string): ParsedFrontmatter {
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

function assertFrontmatter(
  slug: string,
  frontmatter: Record<string, unknown>,
): BlogPostFrontmatter {
  const { title, excerpt, publishedAt, tags } = frontmatter;

  if (
    typeof title !== "string" ||
    typeof excerpt !== "string" ||
    typeof publishedAt !== "string" ||
    !Array.isArray(tags) ||
    tags.some((tag) => typeof tag !== "string")
  ) {
    throw new Error(`Invalid frontmatter in blog post: ${slug}`);
  }

  return { title, excerpt, publishedAt, tags };
}

function estimateReadingTime(markdown: string) {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/[`*_~[\]()]/g, " ");
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

  return `${minutes} min read`;
}

function createPost(slug: string, source: string): BlogPost {
  const { frontmatter, body } = parseFrontmatter(source);

  return {
    slug,
    body,
    readingTime: estimateReadingTime(body),
    ...assertFrontmatter(slug, frontmatter),
  };
}

async function readPostSource(slug: string) {
  return fs.readFile(getPostFilePath(slug), "utf8");
}

async function readPost(slug: string) {
  const source = await readPostSource(slug);
  return createPost(slug, source);
}

function isHeading(line: string) {
  return line.startsWith("## ") || line.startsWith("### ");
}

function isBlockquote(line: string) {
  return line.startsWith("> ");
}

function isCodeFence(line: string) {
  return line.startsWith("```");
}

function isUnorderedListItem(line: string) {
  return /^- /.test(line);
}

function isOrderedListItem(line: string) {
  return /^\d+\. /.test(line);
}

function isParagraphLine(line: string) {
  return (
    line.length > 0 &&
    !isHeading(line) &&
    !isBlockquote(line) &&
    !isCodeFence(line) &&
    !isUnorderedListItem(line) &&
    !isOrderedListItem(line)
  );
}

function consumeCodeBlock(lines: string[], startIndex: number) {
  const language = lines[startIndex].trim().slice(3).trim();
  const codeLines: string[] = [];
  let index = startIndex + 1;

  while (index < lines.length && !isCodeFence(lines[index].trim())) {
    codeLines.push(lines[index]);
    index += 1;
  }

  return {
    block: {
      type: "code" as const,
      content: codeLines.join("\n"),
      language,
    },
    nextIndex: index + 1,
  };
}

function consumeHeading(line: string) {
  if (line.startsWith("### ")) {
    return {
      type: "heading" as const,
      level: 3 as const,
      content: line.slice(4).trim(),
    };
  }

  return {
    type: "heading" as const,
    level: 2 as const,
    content: line.slice(3).trim(),
  };
}

function consumeBlockquote(lines: string[], startIndex: number) {
  const quoteLines: string[] = [];
  let index = startIndex;

  while (index < lines.length && isBlockquote(lines[index].trim())) {
    quoteLines.push(lines[index].trim().slice(2));
    index += 1;
  }

  return {
    block: {
      type: "blockquote" as const,
      content: quoteLines.join(" "),
    },
    nextIndex: index,
  };
}

function consumeList(
  lines: string[],
  startIndex: number,
  type: "unordered-list" | "ordered-list",
) {
  const items: string[] = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index].trim();
    const matches =
      type === "unordered-list"
        ? isUnorderedListItem(line)
        : isOrderedListItem(line);

    if (!matches) {
      break;
    }

    items.push(
      type === "unordered-list"
        ? line.slice(2).trim()
        : line.replace(/^\d+\. /, ""),
    );
    index += 1;
  }

  return {
    block: {
      type,
      items,
    } satisfies MarkdownBlock,
    nextIndex: index,
  };
}

function consumeParagraph(lines: string[], startIndex: number) {
  const paragraphLines: string[] = [];
  let index = startIndex;

  while (index < lines.length && isParagraphLine(lines[index].trim())) {
    paragraphLines.push(lines[index].trim());
    index += 1;
  }

  return {
    block: {
      type: "paragraph" as const,
      content: paragraphLines.join(" "),
    },
    nextIndex: index,
  };
}

export async function getAllPosts() {
  const files = await fs.readdir(BLOG_DIRECTORY);
  const markdownFiles = files.filter(isMarkdownFile);
  const posts = await Promise.all(
    markdownFiles.map((fileName) => readPost(getSlugFromFileName(fileName))),
  );

  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getLatestPosts(limit = 3) {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string) {
  try {
    return await readPost(slug);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return undefined;
    }

    throw error;
  }
}

export function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.split("\n");
  const blocks: MarkdownBlock[] = [];

  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (isCodeFence(line)) {
      const result = consumeCodeBlock(lines, index);
      blocks.push(result.block);
      index = result.nextIndex;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(consumeHeading(line));
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(consumeHeading(line));
      index += 1;
      continue;
    }

    if (isBlockquote(line)) {
      const result = consumeBlockquote(lines, index);
      blocks.push(result.block);
      index = result.nextIndex;
      continue;
    }

    if (isUnorderedListItem(line)) {
      const result = consumeList(lines, index, "unordered-list");
      blocks.push(result.block);
      index = result.nextIndex;
      continue;
    }

    if (isOrderedListItem(line)) {
      const result = consumeList(lines, index, "ordered-list");
      blocks.push(result.block);
      index = result.nextIndex;
      continue;
    }

    const result = consumeParagraph(lines, index);
    blocks.push(result.block);
    index = result.nextIndex;
  }

  return blocks;
}
