import type { Metadata } from "next";
import BlogGrid from "../components/BlogGrid";
import ContactCta from "../components/ContactCta";
import PageIntro from "../components/PageIntro";
import UpcomingArticles from "../components/UpcomingArticles";
import { getAllPosts } from "../lib/blog";
import { siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Practical notes by ${siteConfig.name} on engineering, AI code quality, content systems, and building digital products.`,
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <>
      <PageIntro title="Blog" />
      <section className="mx-auto max-w-6xl px-5 md:px-8 pb-16">
        <UpcomingArticles />
        {posts.length > 0 ? (
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-medium">All articles</h2>
            <BlogGrid posts={posts} />
          </div>
        ) : null}
      </section>
      <ContactCta />
    </>
  );
}
