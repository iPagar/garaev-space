import Link from "next/link";
import { getUpcomingPosts } from "../lib/blog";

export default async function UpcomingArticles() {
  const posts = await getUpcomingPosts();
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <article key={post.slug} className="border border-neutral-300">
          <Link
            href={`/blog/${post.slug}`}
            className="flex h-full flex-col items-start gap-4 p-6 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            <h3 className="text-2xl font-medium">{post.title}</h3>
            <p className="text-sm/7 text-neutral-600">{post.excerpt}</p>
          </Link>
        </article>
      ))}
    </div>
  );
}
