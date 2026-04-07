import Link from "next/link";
import BlogCard from "./components/BlogCard";
import ProjectCard from "./components/ProjectCard";
import { getLatestPosts } from "./lib/blog";

const socialLinks = [
  {
    href: "https://t.me/ipagar",
    label: "Telegram",
  },
  {
    href: "https://linkedin.com/in/ipagar",
    label: "LinkedIn",
  },
];

const ownMobileProjects = [
  "https://apps.apple.com/us/app/supplement-scanner-supplens/id6756219517",
  "https://apps.apple.com/app/6758587114",
];

const ownWebsiteProjects: string[] = ["https://limemenu.org"];

const clientProjects: string[] = [
  // "https://arctida.io/en",
  // "https://stakeholders.arctida.io/en",
  // "https://dumabingo.org",
  // "https://tritrace.io/en",
];

export default async function Home() {
  const latestPosts = await getLatestPosts(3);
  const ownProjectsCount = ownMobileProjects.length + ownWebsiteProjects.length;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="border-b border-zinc-800/80 bg-[radial-gradient(circle_at_top_left,rgba(244,244,245,0.08),transparent_36%),linear-gradient(180deg,rgba(24,24,27,0.98),rgba(9,9,11,1))]">
        <div className="container mx-auto px-6 pt-8 pb-16 sm:pt-10 sm:pb-20">
          <div className="mb-12 flex items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">
                Pavel Garaev
              </p>
              <p className="mt-2 font-mono text-sm text-zinc-400 sm:text-base">
                @ipagar
              </p>
            </div>

            <div className="hidden items-center gap-6 sm:flex">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 transition-colors duration-300 hover:text-zinc-100"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.8fr)] lg:items-end">
            <div className="max-w-4xl">
              <h1 className="max-w-3xl text-4xl font-light leading-tight tracking-tight sm:text-5xl md:text-6xl">
                I build my own products and ship digital work for clients.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
                This site brings together my own projects, client work, and
                notes on product and engineering.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-100 px-5 py-3 text-sm text-zinc-950 transition-colors duration-300 hover:bg-zinc-200"
                >
                  View projects
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-5 py-3 text-sm text-zinc-200 transition-colors duration-300 hover:border-zinc-500 hover:text-zinc-100"
                >
                  Read blog
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                  Own Projects
                </p>
                <p className="mt-4 text-3xl font-light tracking-tight text-zinc-100">
                  {ownProjectsCount}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Products I built and continue to shape myself.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                  Client Work
                </p>
                <p className="mt-4 text-3xl font-light tracking-tight text-zinc-100">
                  {clientProjects.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Websites and platforms delivered for clients.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                  Writing
                </p>
                <p className="mt-4 text-3xl font-light tracking-tight text-zinc-100">
                  {latestPosts.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Notes on building, shipping, and keeping things simple.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 sm:hidden">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-500 transition-colors duration-300 hover:text-zinc-100"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="container mx-auto px-6 py-16 sm:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">
            Work
          </p>
          <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">
            Selected projects
          </h2>
          <p className="mt-4 text-base leading-8 text-zinc-400 sm:text-lg">
            A selection of apps, websites, and client projects.
          </p>
        </div>

        {(ownMobileProjects.length > 0 || ownWebsiteProjects.length > 0) && (
          <div className="mb-12 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
            <div className="mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                  Own Projects
                </p>
                <h3 className="mt-3 text-2xl font-light tracking-tight sm:text-3xl">
                  Apps and websites I build for myself
                </h3>
              </div>
            </div>

            {ownMobileProjects.length > 0 && (
              <div className={ownWebsiteProjects.length > 0 ? "mb-10" : ""}>
                <h4 className="mb-6 text-lg font-light tracking-tight text-zinc-300 sm:text-xl">
                  Mobile Apps
                </h4>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {ownMobileProjects.map((url) => (
                    <ProjectCard key={url} url={url} />
                  ))}
                </div>
              </div>
            )}

            {ownWebsiteProjects.length > 0 && (
              <div>
                <h4 className="mb-6 text-lg font-light tracking-tight text-zinc-300 sm:text-xl">
                  Websites
                </h4>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {ownWebsiteProjects.map((url) => (
                    <ProjectCard key={url} url={url} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {clientProjects.length > 0 && (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-6 sm:p-8">
            <div className="mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                  Client Work
                </p>
                <h3 className="mt-3 text-2xl font-light tracking-tight sm:text-3xl">
                  Products delivered for clients
                </h3>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clientProjects.map((url) => (
                <ProjectCard key={url} url={url} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="container mx-auto px-6 py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">
              Writing
            </p>
            <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">
              Blog
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              Short notes on product work, engineering decisions, and keeping
              things simple enough to ship.
            </p>
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

      <section className="container mx-auto px-6 py-12">
        <div className="flex justify-center gap-8">
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
