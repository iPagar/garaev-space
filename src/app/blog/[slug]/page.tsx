import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactCta from "../../components/ContactCta";
import ContentPending from "../../components/ContentPending";
import MarkdownInline from "../../components/MarkdownInline";
import {
  getAllPosts,
  getPostBySlug,
  getUpcomingPosts,
  parseMarkdown,
} from "../../lib/blog";
import { siteConfig } from "../../lib/site";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const [posts, upcomingPosts] = await Promise.all([
    getAllPosts(),
    getUpcomingPosts(),
  ]);

  return [...posts, ...upcomingPosts].map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.draft ? { index: false, follow: true } : undefined,
    openGraph: {
      description: post.excerpt,
      title: post.title,
      type: "article",
      authors: [siteConfig.name],
      publishedTime: post.draft ? undefined : post.publishedAt,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  if (post.draft) {
    return (
      <ContentPending
        title={post.title}
        backHref="/blog"
        backLabel="All articles"
      />
    );
  }

  const blocks = parseMarkdown(post.body);

  return (
    <>
      <article>
        <header className="border-b border-neutral-300 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Link
              href="/blog"
              className="text-sm font-semibold text-black hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              All articles
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
              <span>{siteConfig.name}</span>
              <time dateTime={post.publishedAt}>
                {new Intl.DateTimeFormat("en", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(post.publishedAt))}
              </time>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="mt-6 text-5xl font-semibold text-balance text-neutral-950 sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg/8 text-neutral-600">
              {post.excerpt}
            </p>
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
                    className="pt-6 text-3xl font-semibold text-neutral-950"
                  >
                    <MarkdownInline content={block.content} />
                  </h2>
                );
              }

              return (
                <h3
                  key={key}
                  className="pt-3 text-2xl font-semibold text-neutral-950"
                >
                  <MarkdownInline content={block.content} />
                </h3>
              );
            }

            if (block.type === "paragraph") {
              return (
                <p key={key} className="text-lg/9 text-neutral-700">
                  <MarkdownInline content={block.content} />
                </p>
              );
            }

            if (block.type === "unordered-list") {
              return (
                <ul
                  key={key}
                  className="grid list-disc gap-3 pl-6 text-lg/9 text-neutral-700 marker:text-neutral-400"
                >
                  {block.items.map((item) => (
                    <li key={item}>
                      <MarkdownInline content={item} />
                    </li>
                  ))}
                </ul>
              );
            }

            if (block.type === "ordered-list") {
              return (
                <ol
                  key={key}
                  className="grid list-decimal gap-3 pl-6 text-lg/9 text-neutral-700 marker:text-neutral-400"
                >
                  {block.items.map((item) => (
                    <li key={item}>
                      <MarkdownInline content={item} />
                    </li>
                  ))}
                </ol>
              );
            }

            if (block.type === "blockquote") {
              return (
                <blockquote
                  key={key}
                  className="border-l-2 border-neutral-300 px-6 py-3 text-lg/9 italic text-neutral-600"
                >
                  <MarkdownInline content={block.content} />
                </blockquote>
              );
            }

            return (
              <pre
                key={key}
                className="overflow-x-auto bg-neutral-950 p-5 text-sm/7 text-neutral-100"
              >
                <code>{block.content}</code>
              </pre>
            );
          })}
        </div>
      </article>
      <ContactCta />
    </>
  );
}
