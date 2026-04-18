import Link from "next/link";
import BlogCard from "../components/BlogCard";
import { getAllPosts } from "../lib/blog";

export const metadata = {
  title: "Blog | Pavel Garaev",
  description: "Writing about products, engineering, and side projects.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featuredPost, ...otherPosts] = posts;

  return (
    <main className="site-shell min-h-screen px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700/60 px-4 py-2 text-sm text-zinc-400 hover:border-zinc-500 hover:text-zinc-100"
        >
          <span aria-hidden="true">←</span>
          Home
        </Link>

        <section className="mt-6 rounded-[2rem] border border-zinc-800/80 bg-zinc-900/40 px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-400">
              Writing archive
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-zinc-100 sm:text-6xl">
              Notes on building, shipping, and keeping the surface area small.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Notes on products, engineering, and the tradeoffs behind what gets
              shipped.
            </p>
          </div>
        </section>

        {featuredPost && (
          <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
            <div className="rounded-[2rem] border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-400">
                Featured post
              </p>
              <time
                dateTime={featuredPost.publishedAt}
                className="mt-8 block text-sm text-zinc-400"
              >
                {new Intl.DateTimeFormat("en", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(featuredPost.publishedAt))}
              </time>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
                {featuredPost.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-zinc-400">
                {featuredPost.excerpt}
              </p>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="mt-8 inline-flex items-center rounded-full bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
              >
                Continue reading
              </Link>
            </div>

            <div className="grid gap-6">
              {otherPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
