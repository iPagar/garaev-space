import Link from "next/link";
import ProjectCard from "./components/ProjectCard";
import { getLatestPosts } from "./lib/blog";
import {
  clientProjects,
  ownMobileProjects,
  ownWebsiteProjects,
  socialLinks,
} from "./lib/site";

export default async function Home() {
  const latestPosts = await getLatestPosts(3);
  const [featuredPost, ...secondaryPosts] = latestPosts;

  return (
    <main className="site-shell min-h-screen bg-zinc-950 text-zinc-100">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8"
        >
          <Link
            href="/"
            className="-m-1.5 p-1.5 text-sm font-semibold uppercase tracking-[0.28em] text-zinc-100"
          >
            Pavel Garaev
          </Link>

          <div className="hidden lg:flex lg:gap-x-10">
            <div className="flex items-center gap-x-10">
              <a
                href="#projects"
                className="text-sm/6 font-semibold text-zinc-100"
              >
                Projects
              </a>
              <Link
                href="/blog"
                className="text-sm/6 font-semibold text-zinc-100"
              >
                Blog
              </Link>
            </div>

            <div className="flex items-center gap-x-4 border-l border-zinc-800/80 pl-6">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-100"
                >
                  <span className="sr-only">{item.label}</span>
                  <item.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <section className="py-32 sm:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:items-center">
            <div className="max-w-4xl">
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-zinc-100 sm:text-7xl">
                I build products and ship digital work.
              </h1>
              <p className="mt-6 max-w-2xl text-xl/8 text-zinc-300">
                Own apps, selected web work, and writing about product and
                engineering.
              </p>
              <p className="mt-6 max-w-2xl text-base/7 text-zinc-400">
                I use this site to collect what I build for myself, what I ship
                for clients, and the notes worth keeping after the work is done.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#projects"
                  className="rounded-md bg-zinc-100 px-3.5 py-2.5 text-sm font-semibold text-zinc-950 shadow-xs hover:bg-zinc-200"
                >
                  View projects
                </a>
                <Link
                  href="/blog"
                  className="text-sm/6 font-semibold text-zinc-100"
                >
                  Read blog <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 shadow-2xl shadow-black/20">
                <img
                  alt="Hero visual placeholder"
                  src="/icon.jpeg"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-zinc-100 sm:text-5xl">
              Selected apps, websites, and public work.
            </h2>
            <p className="mt-6 text-lg/8 text-zinc-400">
              A focused selection of products I continue to shape and projects I
              have shipped in public.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {ownMobileProjects.map((url) => (
              <ProjectCard key={url} url={url} />
            ))}
            {ownWebsiteProjects.map((url) => (
              <ProjectCard key={url} url={url} />
            ))}
            {clientProjects.map((url) => (
              <ProjectCard key={url} url={url} />
            ))}
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 lg:grid-cols-2">
            <article className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-lg">
              <time
                dateTime={featuredPost.publishedAt}
                className="block text-sm/6 text-zinc-400"
              >
                {new Intl.DateTimeFormat("en", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(new Date(featuredPost.publishedAt))}
              </time>
              <h2
                id="featured-post"
                className="mt-4 text-3xl font-semibold tracking-tight text-pretty text-zinc-100 sm:text-4xl"
              >
                {featuredPost.title}
              </h2>
              <p className="mt-4 text-lg/8 text-zinc-400">
                {featuredPost.excerpt}
              </p>
              <div className="mt-6 flex flex-col gap-6 sm:mt-8 lg:mt-6">
                <div className="flex">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    aria-describedby="featured-post"
                    className="text-sm/6 font-semibold text-zinc-100 hover:text-zinc-300"
                  >
                    Continue reading <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
                <div className="flex border-t border-zinc-800/80 pt-6">
                  <Link
                    href="/blog"
                    className="text-sm/6 font-medium text-zinc-400 transition hover:text-zinc-100"
                  >
                    Read all posts
                  </Link>
                </div>
              </div>
            </article>
            <div className="mx-auto w-full max-w-2xl border-t border-zinc-800/80 pt-12 sm:pt-16 lg:mx-0 lg:max-w-none lg:border-t-0 lg:pt-0">
              <div className="-my-12 divide-y divide-zinc-800/80">
                {secondaryPosts.map((post) => (
                  <article key={post.slug} className="py-12">
                    <div className="group relative max-w-xl">
                      <time
                        dateTime={post.publishedAt}
                        className="block text-sm/6 text-zinc-400"
                      >
                        {new Intl.DateTimeFormat("en", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(post.publishedAt))}
                      </time>
                      <h3 className="mt-2 text-lg font-semibold text-zinc-100 group-hover:text-zinc-300">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-4 text-sm/6 text-zinc-400">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-800/80 px-3 py-1 text-xs text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center gap-x-6 md:order-2">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-100"
              >
                <span className="sr-only">{item.label}</span>
                <item.icon className="size-5" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-sm/6 text-zinc-400 md:order-1 md:mt-0">
            Portfolio, projects, and writing by Pavel Garaev.
          </p>
        </div>
      </footer>
    </main>
  );
}
