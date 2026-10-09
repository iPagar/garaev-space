import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parseFrontmatter } from "./markdown";

const CASES_DIRECTORY = path.join(process.cwd(), "content", "case-studies");

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  projectType: string;
  projectUrl?: string;
  coverImage: string;
  coverAlt: string;
  coverCaption: string;
  serviceSlug: string;
  featured?: boolean;
  order: number;
  draft: boolean;
  body: string;
};

function createCaseStudy(slug: string, source: string): CaseStudy {
  const { frontmatter, body } = parseFrontmatter(source);
  const {
    title,
    summary,
    serviceSlug,
    featured,
    draft,
    role,
    projectType,
    projectUrl,
    coverImage,
    coverAlt,
    coverCaption,
  } = frontmatter;
  const order = Number(frontmatter.order);

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof summary !== "string" ||
    !summary.trim() ||
    typeof role !== "string" ||
    !role.trim() ||
    typeof projectType !== "string" ||
    !projectType.trim() ||
    (projectUrl !== undefined &&
      (typeof projectUrl !== "string" || !projectUrl.startsWith("https://"))) ||
    typeof coverImage !== "string" ||
    !coverImage.startsWith("/case-studies/") ||
    typeof coverAlt !== "string" ||
    !coverAlt.trim() ||
    typeof coverCaption !== "string" ||
    !coverCaption.trim() ||
    (!draft && !body.trim()) ||
    typeof serviceSlug !== "string" ||
    !serviceSlug.trim() ||
    (featured !== undefined && typeof featured !== "boolean") ||
    typeof draft !== "boolean" ||
    typeof frontmatter.order !== "string" ||
    !Number.isInteger(order) ||
    order < 1
  ) {
    throw new Error(`Invalid frontmatter in case study: ${slug}`);
  }

  return {
    slug,
    title,
    summary,
    serviceSlug,
    featured,
    order,
    draft,
    body,
    role,
    projectType,
    projectUrl,
    coverImage,
    coverAlt,
    coverCaption,
  };
}

export const getCaseStudies = cache(async function getCaseStudies(): Promise<
  CaseStudy[]
> {
  const files = await fs.readdir(CASES_DIRECTORY);
  const caseStudies = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const source = await fs.readFile(
          path.join(CASES_DIRECTORY, file),
          "utf8",
        );
        return createCaseStudy(file.slice(0, -3), source);
      }),
  );
  return caseStudies
    .filter((item) => !item.draft)
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
});

export async function getCaseStudyBySlug(slug: string) {
  const caseStudies = await getCaseStudies();
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
