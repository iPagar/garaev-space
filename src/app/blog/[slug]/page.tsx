import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactCta from "../../components/ContactCta";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
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
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      description: post.excerpt,
      title: post.title,
      type: "article",
      url: `/blog/${post.slug}`,
    },
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
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <article>
        <header className="border-b border-slate-200 bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Link
              href="/blog"
              className="text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              ← All writing
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <time dateTime={post.publishedAt}>
                {new Intl.DateTimeFormat("en", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(post.publishedAt))}
              </time>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-balance text-slate-950 sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg/8 text-slate-600">
              {post.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-4xl gap-6 px-6 py-16 lg:px-8 lg:py-20">
          {blocks.map((block, index) => {
            const key = `${block.type}-${index}`;

            if (block.type === "heading") {
              if (block.level === 2) {
                return (
                  <h2
                    key={key}
                    className="pt-6 text-3xl font-semibold tracking-tight text-slate-950"
                  >
                    {block.content}
                  </h2>
                );
              }

              return (
                <h3
                  key={key}
                  className="pt-3 text-2xl font-semibold tracking-tight text-slate-950"
                >
                  {block.content}
                </h3>
              );
            }

            if (block.type === "paragraph") {
              return (
                <p key={key} className="text-lg/9 text-slate-700">
                  {block.content}
                </p>
              );
            }

            if (block.type === "unordered-list") {
              return (
                <ul
                  key={key}
                  className="grid list-disc gap-3 pl-6 text-lg/9 text-slate-700 marker:text-slate-400"
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
                  className="grid list-decimal gap-3 pl-6 text-lg/9 text-slate-700 marker:text-slate-400"
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
                  className="border-l-2 border-slate-300 px-6 py-3 text-lg/9 italic text-slate-600"
                >
                  {block.content}
                </blockquote>
              );
            }

            return (
              <pre
                key={key}
                className="overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm/7 text-slate-100"
              >
                <code>{block.content}</code>
              </pre>
            );
          })}
        </div>
      </article>
      <ContactCta />
      <SiteFooter />
    </main>
  );
}
