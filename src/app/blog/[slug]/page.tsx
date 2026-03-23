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
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="container mx-auto px-6 pt-12 pb-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors duration-300 hover:text-zinc-100"
        >
          <span aria-hidden="true">←</span>
          All posts
        </Link>

        <article className="mx-auto mt-10 max-w-3xl">
          <header className="border-b border-zinc-700/30 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-zinc-500">
              <time dateTime={post.publishedAt}>
                {new Intl.DateTimeFormat("en", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(post.publishedAt))}
              </time>
              <span>{post.readingTime}</span>
            </div>

            <h1 className="mt-5 text-4xl font-light tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-500">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-700/40 px-3 py-1 text-xs text-zinc-500"
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
                      className="text-2xl font-light tracking-tight text-zinc-100"
                    >
                      {block.content}
                    </h2>
                  );
                }

                return (
                  <h3
                    key={key}
                    className="text-xl font-light tracking-tight text-zinc-100"
                  >
                    {block.content}
                  </h3>
                );
              }

              if (block.type === "paragraph") {
                return (
                  <p
                    key={key}
                    className="text-[1.05rem] leading-[1.95] text-zinc-200/85"
                  >
                    {block.content}
                  </p>
                );
              }

              if (block.type === "unordered-list") {
                return (
                  <ul
                    key={key}
                    className="grid list-disc gap-3 pl-6 text-[1.05rem] leading-[1.95] text-zinc-200/85 marker:text-zinc-500"
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
                    className="grid list-decimal gap-3 pl-6 text-[1.05rem] leading-[1.95] text-zinc-200/85 marker:text-zinc-500"
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
                    className="border-l border-zinc-700 pl-5 text-[1.05rem] italic leading-[1.95] text-zinc-300"
                  >
                    {block.content}
                  </blockquote>
                );
              }

              return (
                <pre
                  key={key}
                  className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-sm leading-7 text-zinc-200"
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
