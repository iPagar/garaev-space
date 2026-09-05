import type { MetadataRoute } from "next";
import { getAllPosts } from "./lib/blog";

import { siteConfig } from "./lib/site";
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

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
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
