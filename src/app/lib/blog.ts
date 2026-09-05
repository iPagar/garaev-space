import { promises as fs } from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "./markdown";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");
const MARKDOWN_EXTENSION = ".md";
const WORDS_PER_MINUTE = 200;

interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
}

export interface BlogPost extends BlogPostFrontmatter {
  draft: false;
  publishedAt: string;
  slug: string;
  body: string;
  readingTime: string;
}

export interface DraftBlogPost extends BlogPostFrontmatter {
  draft: true;
  slug: string;
  body: string;
}

export type MarkdownBlock =
  | { type: "heading"; content: string; level: 2 | 3 }
  | { type: "paragraph"; content: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "blockquote"; content: string }
  | { type: "code"; content: string; language: string };

function getPostFilePath(slug: string) {
  return path.join(BLOG_DIRECTORY, `${slug}${MARKDOWN_EXTENSION}`);
}

function getSlugFromFileName(fileName: string) {
  return fileName.replace(/\.md$/, "");
}

function isMarkdownFile(fileName: string) {
  return fileName.endsWith(MARKDOWN_EXTENSION);
}

function assertFrontmatter(
  slug: string,
  frontmatter: Record<string, unknown>,
): BlogPostFrontmatter &
  ({ draft: true } | { draft: false; publishedAt: string }) {
  const { title, excerpt, publishedAt, draft } = frontmatter;

  if (
    typeof title !== "string" ||
    typeof excerpt !== "string" ||
    typeof draft !== "boolean"
  ) {
    throw new Error(`Invalid frontmatter in blog post: ${slug}`);
  }

  if (draft) return { title, excerpt, draft: true };

  if (
    typeof publishedAt !== "string" ||
    Number.isNaN(Date.parse(publishedAt))
  ) {
    throw new Error(
      `Missing or invalid publication date in blog post: ${slug}`,
    );
  }

  return { title, excerpt, publishedAt, draft: false };
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

function createPost(slug: string, source: string): BlogPost | DraftBlogPost {
  const { frontmatter, body } = parseFrontmatter(source);
  const metadata = assertFrontmatter(slug, frontmatter);

  if (metadata.draft) return { ...metadata, slug, body };

  if (!body) throw new Error(`Published blog post has no content: ${slug}`);

  return {
    slug,
    body,
    readingTime: estimateReadingTime(body),
    ...metadata,
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

async function readPosts() {
  const files = await fs.readdir(BLOG_DIRECTORY);
  const markdownFiles = files.filter(isMarkdownFile);
  return Promise.all(
    markdownFiles.map((fileName) => readPost(getSlugFromFileName(fileName))),
  );
}

export async function getAllPosts() {
  const posts = await readPosts();
  return posts
    .filter((post): post is BlogPost => !post.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getUpcomingPosts() {
  const posts = await readPosts();
  return posts
    .filter((post): post is DraftBlogPost => post.draft)
    .sort((a, b) => a.slug.localeCompare(b.slug));
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
