import Link from "next/link";
import BlogCard from "../components/BlogCard";
import { getAllPosts } from "../lib/blog";

export const metadata = {
  title: "Blog | Pavel Garaev",
  description: "Writing about products, engineering, and side projects.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="container mx-auto px-6 pt-12 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors duration-300 hover:text-zinc-100"
        >
          <span aria-hidden="true">←</span>
          Home
        </Link>

        <div className="mt-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">
            Blog
          </p>
          <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">
            Notes on building, shipping, and keeping things simple.
          </h1>
          <p className="mt-4 text-base leading-8 text-zinc-500 sm:text-lg">
            A lightweight writing space inside the site. Right now posts are
            static, which keeps publishing fast and deployment trivial.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
