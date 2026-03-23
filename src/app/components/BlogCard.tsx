import Link from "next/link";
import type { BlogPost } from "../lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col rounded-3xl border border-zinc-700/40 bg-white/4 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-500/60">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-zinc-500">
          <time dateTime={post.publishedAt}>
            {new Intl.DateTimeFormat("en", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(new Date(post.publishedAt))}
          </time>
          <span>{post.readingTime}</span>
        </div>

        <h3 className="mb-3 text-2xl font-light tracking-tight text-zinc-100 transition-colors duration-300 group-hover:text-white">
          {post.title}
        </h3>

        <p className="mb-6 text-sm leading-7 text-zinc-500">{post.excerpt}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-700/40 px-3 py-1 text-xs text-zinc-500 transition-colors duration-300 group-hover:border-zinc-500/60 group-hover:text-zinc-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
