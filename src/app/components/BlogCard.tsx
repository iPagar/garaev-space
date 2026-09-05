import Link from "next/link";
import type { BlogPost } from "../lib/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="border border-neutral-300">
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col items-start gap-4 p-6 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        <div className="flex flex-wrap gap-3 text-xs text-neutral-600">
          <time dateTime={post.publishedAt}>
            {new Intl.DateTimeFormat("en", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(new Date(post.publishedAt))}
          </time>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="text-2xl font-medium">{post.title}</h3>
        <p className="text-sm/7 text-neutral-600">{post.excerpt}</p>
      </Link>
    </article>
  );
}
