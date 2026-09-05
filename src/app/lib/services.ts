import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parseFrontmatter } from "./markdown";

const SERVICES_DIRECTORY = path.join(process.cwd(), "content", "services");

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  order: number;
  draft: boolean;
  body: string;
};

function createService(slug: string, source: string): Service {
  const { frontmatter, body } = parseFrontmatter(source);
  const { title, shortTitle, shortDescription, draft } = frontmatter;
  const order = Number(frontmatter.order);

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof shortTitle !== "string" ||
    !shortTitle.trim() ||
    typeof shortDescription !== "string" ||
    typeof draft !== "boolean" ||
    typeof frontmatter.order !== "string" ||
    !Number.isInteger(order) ||
    order < 1
  ) {
    throw new Error(`Invalid frontmatter in service: ${slug}`);
  }

  return {
    slug,
    title,
    shortTitle,
    shortDescription,
    order,
    draft,
    body,
  };
}

export const getServices = cache(async function getServices(): Promise<
  Service[]
> {
  const files = await fs.readdir(SERVICES_DIRECTORY);
  const services = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const source = await fs.readFile(
          path.join(SERVICES_DIRECTORY, file),
          "utf8",
        );
        return createService(file.slice(0, -3), source);
      }),
  );
  return services.sort(
    (a, b) => a.order - b.order || a.slug.localeCompare(b.slug),
  );
});

export async function getServiceBySlug(slug: string) {
  const services = await getServices();
  return services.find((service) => service.slug === slug);
}
