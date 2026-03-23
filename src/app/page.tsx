import Link from "next/link";
import BlogCard from "./components/BlogCard";
import ProjectCard from "./components/ProjectCard";
import { getLatestPosts } from "./lib/blog";

const mobileProjects = [
  "https://apps.apple.com/us/app/supplement-scanner-supplens/id6756219517",
  "https://apps.apple.com/app/6758587114",
];

const websiteProjects: string[] = [
  "https://limemenu.org",
  // TODO: Add website projects
  // "https://arctida.io/en",
  // "https://stakeholders.arctida.io/en",
];

export default async function Home() {
  const latestPosts = await getLatestPosts(3);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <section className="container mx-auto px-6 pt-12 pb-8">
        <div className="text-center">
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
            Pavel Garaev
          </h1>
          <p className="mt-2 font-mono text-sm text-zinc-500 sm:text-base">
            @ipagar
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="mb-8 text-2xl font-light tracking-tight sm:text-3xl">
          Projects
        </h2>

        {/* Mobile Projects */}
        {mobileProjects.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-6 text-xl font-light tracking-tight text-zinc-500 sm:text-2xl">
              Mobile Apps
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mobileProjects.map((url) => (
                <ProjectCard key={url} url={url} />
              ))}
            </div>
          </div>
        )}

        {/* Website Projects */}
        {websiteProjects.length > 0 && (
          <div>
            <h3 className="mb-6 text-xl font-light tracking-tight text-zinc-500 sm:text-2xl">
              Websites
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {websiteProjects.map((url) => (
                <ProjectCard key={url} url={url} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">
              Writing
            </p>
            <h2 className="mt-3 text-2xl font-light tracking-tight sm:text-3xl">
              Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm text-zinc-500 transition-colors duration-300 hover:text-zinc-100"
          >
            View all posts
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Links & Footer */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex justify-center gap-8">
          {/* Telegram */}
          <a
            href="https://t.me/ipagar"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-zinc-500 transition-colors duration-300 hover:text-zinc-100"
            aria-label="Telegram"
          >
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <title>Telegram</title>
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            <span className="font-light text-sm">Telegram</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/ipagar"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-zinc-500 transition-colors duration-300 hover:text-zinc-100"
            aria-label="LinkedIn"
          >
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <title>LinkedIn</title>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="font-light text-sm">LinkedIn</span>
          </a>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center font-mono text-xs text-zinc-500/50">
          © {new Date().getFullYear()}
        </p>
      </section>
    </main>
  );
}
