import type { BlogPost } from "../lib/blog";
import BlogCard from "./BlogCard";

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
