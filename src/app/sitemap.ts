import type { MetadataRoute } from "next";
import { getAllPosts } from "./lib/blog";
import { getCaseStudies } from "./lib/cases";

import { getServices } from "./lib/services";
import { siteConfig } from "./lib/site";
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies, services] = await Promise.all([
    getAllPosts(),
    getCaseStudies(),
    getServices(),
  ]);

  const pages: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteConfig.url}/services`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/case-studies`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${siteConfig.url}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/privacy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  return [
    ...pages,
    ...services
      .filter((service) => !service.draft)
      .map((service) => ({
        url: `${siteConfig.url}/services/${service.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      })),
    ...caseStudies
      .filter((item) => !item.draft)
      .map((item) => ({
        url: `${siteConfig.url}/case-studies/${item.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
