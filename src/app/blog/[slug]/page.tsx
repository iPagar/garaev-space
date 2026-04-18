import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, parseMarkdown } from "../../lib/blog";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Pavel Garaev",
    };
  }

  return {
    title: `${post.title} | Pavel Garaev`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blocks = parseMarkdown(post.body);

  return (
    <main className="site-shell min-h-screen px-6 py-8 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700/60 px-4 py-2 text-sm text-zinc-400 hover:border-zinc-500 hover:text-zinc-100"
        >
          <span aria-hidden="true">←</span>
          All posts
        </Link>

        <article className="mt-6 rounded-[2rem] border border-zinc-800/80 bg-zinc-900/40 px-6 py-10 sm:px-10 sm:py-14">
          <header className="border-b border-zinc-800/80 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              <time dateTime={post.publishedAt}>
                {new Intl.DateTimeFormat("en", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(post.publishedAt))}
              </time>
              <span>{post.readingTime}</span>
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-zinc-100 sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-800/80 bg-zinc-950 px-3 py-1 text-xs text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="mt-10 grid gap-6">
            {blocks.map((block, index) => {
              const key = `${block.type}-${index}`;

              if (block.type === "heading") {
                if (block.level === 2) {
                  return (
                    <h2
                      key={key}
                      className="pt-4 text-3xl font-semibold tracking-tight text-zinc-100"
                    >
                      {block.content}
                    </h2>
                  );
                }

                return (
                  <h3
                    key={key}
                    className="pt-2 text-2xl font-semibold tracking-tight text-zinc-100"
                  >
                    {block.content}
                  </h3>
                );
              }

              if (block.type === "paragraph") {
                return (
                  <p key={key} className="text-lg leading-9 text-zinc-200/90">
                    {block.content}
                  </p>
                );
              }

              if (block.type === "unordered-list") {
                return (
                  <ul
                    key={key}
                    className="grid list-disc gap-3 pl-6 text-lg leading-9 text-zinc-200/90 marker:text-zinc-500"
                  >
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }

              if (block.type === "ordered-list") {
                return (
                  <ol
                    key={key}
                    className="grid list-decimal gap-3 pl-6 text-lg leading-9 text-zinc-200/90 marker:text-zinc-500"
                  >
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                );
              }

              if (block.type === "blockquote") {
                return (
                  <blockquote
                    key={key}
                    className="rounded-r-[1.5rem] border-l-2 border-zinc-700 px-6 py-5 text-lg italic leading-9 text-zinc-300"
                  >
                    {block.content}
                  </blockquote>
                );
              }

              return (
                <pre
                  key={key}
                  className="overflow-x-auto rounded-[1.5rem] border border-zinc-800/80 bg-zinc-950 p-5 text-sm leading-7 text-zinc-100"
                >
                  <code>{block.content}</code>
                </pre>
              );
            })}
          </div>
        </article>
      </section>
    </main>
  );
}
