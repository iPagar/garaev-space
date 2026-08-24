import Link from "next/link";
import type { BlogPost } from "../lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-md">
        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <time dateTime={post.publishedAt}>
            {new Intl.DateTimeFormat("en", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(new Date(post.publishedAt))}
          </time>
          <span>{post.readingTime}</span>
        </div>

        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-950 group-hover:text-blue-700">
          {post.title}
        </h2>

        <p className="mb-6 text-sm leading-7 text-slate-600">{post.excerpt}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
