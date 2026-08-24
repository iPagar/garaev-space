import type { Metadata } from "next";
import BlogCard from "../components/BlogCard";
import PageIntro from "../components/PageIntro";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { getAllPosts } from "../lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes by Pavel Garaev about software products, engineering, and delivery work.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <PageIntro
        title="Writing"
        description="Notes on software products, engineering work, and decisions made during delivery."
      />
      <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:px-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
