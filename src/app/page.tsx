import Image from "next/image";
import Link from "next/link";
import CaseStudyCard from "./components/CaseStudyCard";
import ContactCta from "./components/ContactCta";
import ProjectCard from "./components/ProjectCard";
import ServiceCard from "./components/ServiceCard";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import SolutionCard from "./components/SolutionCard";
import { getLatestPosts } from "./lib/blog";
import { caseStudies } from "./lib/cases";
import { services } from "./lib/services";
import { ownMobileProjects, ownWebsiteProjects } from "./lib/site";
import { allSolutions } from "./lib/solutions";

const facts = [
  { label: "Production engineering", value: "6+ years" },
  { label: "Web and e-commerce products", value: "10+" },
  { label: "Mobile platforms", value: "iOS and Android" },
  { label: "Working languages", value: "English and Russian" },
];

const experience = [
  {
    title: "AI and investigation products",
    description:
      "Persistent search, external integrations, structured LLM output, graph exploration, exports, and operational workflows.",
  },
  {
    title: "Data-heavy web platforms",
    description:
      "Administrative applications, complex records, validation, filters, access controls, imports, and exports.",
  },
  {
    title: "Mobile and payment products",
    description:
      "React Native applications for iOS and Android with onboarding, forms, payments, subscriptions, and API integration.",
  },
];

const profileSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  jobTitle: "Senior full-stack engineer",
  knowsAbout: [
    "Full-stack development",
    "Next.js",
    "React Native",
    "Node.js",
    "PostgreSQL",
    "AI products",
    "Data platforms",
  ],
  name: "Pavel Garaev",
  sameAs: ["https://linkedin.com/in/ipagar", "https://t.me/ipagar"],
  url: "https://pavelgaraev.com",
}).replace(/</g, "\\u003c");

export default async function Home() {
  const latestPosts = await getLatestPosts(3);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This JSON is generated from static profile data and markup characters are escaped.
        dangerouslySetInnerHTML={{ __html: profileSchemaJson }}
      />

      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.75fr)] lg:items-center lg:gap-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <h1 className="max-w-xl text-4xl/none font-semibold tracking-tight text-balance text-slate-950 sm:text-5xl sm:leading-[1.05]">
              Senior full-stack engineer
            </h1>
            <p className="mt-7 max-w-xl text-lg/8 text-slate-600">
              I build AI and data products, web applications, and React Native
              apps. My work covers architecture, frontend, backend,
              integrations, and production delivery.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
              >
                Discuss a project or role
              </Link>
              <Link
                href="/case-studies"
                className="px-2 py-3 text-sm font-semibold text-slate-950 hover:text-blue-700"
              >
                View case studies <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="min-w-0">
            <div className="overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src="/hero-workspace.jpg"
                alt="Laptop with a software development environment open"
                width={1600}
                height={2398}
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="aspect-[4/5] w-full object-cover object-[58%_62%]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col py-8 sm:px-6">
                <dt className="text-sm/6 text-slate-600">{fact.label}</dt>
                <dd className="order-first text-2xl font-semibold tracking-tight text-slate-950">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="services" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-slate-950 sm:text-5xl">
              What I work on
            </h2>
            <p className="mt-6 text-lg/8 text-slate-600">
              I take on complete product areas or focused engineering work in an
              existing system.
            </p>
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-12 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-semibold tracking-tight text-balance text-slate-950 sm:text-5xl">
                Who I help
              </h2>
              <p className="mt-6 text-lg/8 text-slate-600">
                Engineering shaped around the workflow and constraints of the
                team buying the work.
              </p>
            </div>
            <Link
              href="/solutions"
              className="shrink-0 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              View all client types <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {allSolutions.map((solution) => (
              <SolutionCard key={solution.slug} solution={solution} />
            ))}
          </div>
        </div>
      </section>

      <section id="case-studies" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-semibold tracking-tight text-balance text-slate-950 sm:text-5xl">
                Selected case studies
              </h2>
              <p className="mt-6 text-lg/8 text-slate-600">
                Examples of the systems, workflows, and product areas I have
                worked on.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="shrink-0 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              View all cases <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div className="max-w-xl">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Experience
              </h2>
              <p className="mt-6 text-lg/8 text-slate-600">
                My work covers product development, system design, production
                engineering, and ongoing improvement after release.
              </p>
              <div className="mt-8 flex flex-wrap gap-5">
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-blue-700 hover:text-blue-900"
                >
                  Discuss a role <span aria-hidden="true">→</span>
                </Link>
                <a
                  href="https://linkedin.com/in/ipagar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-slate-700 hover:text-slate-950"
                >
                  LinkedIn <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="grid gap-8">
              {experience.map((item) => (
                <article
                  key={item.title}
                  className="border-t border-slate-300 pt-6"
                >
                  <h3 className="text-lg font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base/7 text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="border-y border-slate-200 bg-slate-50 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Products I maintain
            </h2>
            <p className="mt-6 text-lg/8 text-slate-600">
              Public products I have shipped and continue to work on.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {ownMobileProjects.map((url) => (
              <ProjectCard key={url} url={url} />
            ))}
            {ownWebsiteProjects.map((url) => (
              <ProjectCard key={url} url={url} />
            ))}
          </div>
        </div>
      </section>

      {latestPosts.length > 0 ? (
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl lg:mx-0">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Recent writing
              </h2>
              <p className="mt-4 text-lg/8 text-slate-600">
                Notes on product work, engineering, and decisions made during
                delivery.
              </p>
            </div>
            <div className="mt-12 grid gap-10 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <article key={post.slug} className="flex flex-col">
                  <time
                    dateTime={post.publishedAt}
                    className="text-sm/6 text-slate-500"
                  >
                    {new Intl.DateTimeFormat("en", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(post.publishedAt))}
                  </time>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-700"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 flex-auto text-sm/6 text-slate-600">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 text-sm font-semibold text-blue-700 hover:text-blue-900"
                  >
                    Read article <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactCta />
      <SiteFooter />
    </main>
  );
}
