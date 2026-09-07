import Link from "next/link";
import BlogGrid from "./components/BlogGrid";
import CaseStudyCard from "./components/CaseStudyCard";
import Collaborators from "./components/Collaborators";
import ContactCta from "./components/ContactCta";
import HomeHero from "./components/HomeHero";
import ServiceCard from "./components/ServiceCard";
import UpcomingArticles from "./components/UpcomingArticles";
import { getAllPosts } from "./lib/blog";
import { getCaseStudies } from "./lib/cases";
import { getServices } from "./lib/services";
import { siteConfig, socialProfiles } from "./lib/site";
import { LinkedInIcon } from "./lib/social-icons";

const profileSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: "Design and engineering consultant",
  description: siteConfig.description,
  sameAs: Object.values(socialProfiles).map((profile) => profile.href),
  url: siteConfig.url,
}).replace(/</g, "\\u003c");

export default async function Home() {
  const [services, caseStudies, posts] = await Promise.all([
    getServices(),
    getCaseStudies(),
    getAllPosts(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Static profile data with escaped markup characters.
        dangerouslySetInnerHTML={{ __html: profileSchemaJson }}
      />
      <HomeHero />

      <section id="services" className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-medium md:text-3xl">Services</h2>
          <Link
            href="/services"
            className="text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            All services
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 [&>article]:lg:col-span-2 [&>article:nth-child(-n+2)]:lg:col-span-3 [&>article:last-child]:sm:col-span-2 [&>article:last-child]:lg:col-span-2">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} visual />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-medium md:text-3xl">
            Selected case studies
          </h2>
          <Link
            href="/case-studies"
            className="text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            All case studies
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudies
            .filter((item) => item.featured)
            .map((item) => (
              <CaseStudyCard key={item.slug} caseStudy={item} compact />
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <h2 className="mb-8 text-2xl font-medium md:text-3xl">
          Clients & collaborators
        </h2>
        <Collaborators />
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-2 md:gap-12 md:px-8">
        <div>
          <h2 className="text-2xl font-medium md:text-3xl">About me</h2>
          <Link
            href={socialProfiles.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="mt-6 inline-flex size-10 items-center justify-center hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            <LinkedInIcon className="size-5" aria-hidden="true" />
          </Link>
        </div>
        <div className="space-y-5 text-sm/7 text-neutral-600">
          <p>
            I’m Pavel, a designer and full-stack engineer. I work with research
            teams, media organizations, and people whose expertise deserves
            useful digital tools.
          </p>
          <p>My work covers interfaces, backend systems, and integrations.</p>
          <div className="border-t border-neutral-300 pt-5">
            <p className="font-medium text-black">
              Projects & engineering roles
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block text-black underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-medium md:text-3xl">Blog</h2>
          <Link
            href="/blog"
            className="text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Visit the blog
          </Link>
        </div>
        <div className="space-y-10">
          <UpcomingArticles />
          {posts.length > 0 ? <BlogGrid posts={posts.slice(0, 2)} /> : null}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
