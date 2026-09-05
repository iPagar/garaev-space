import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyCard from "../components/CaseStudyCard";
import ContactCta from "../components/ContactCta";
import PageIntro from "../components/PageIntro";
import { getCaseStudies } from "../lib/cases";
import { getServices } from "../lib/services";
import { siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description: `Projects across AI research tools, websites, web applications, mobile products, and desktop software by ${siteConfig.name}.`,
  alternates: { canonical: "/case-studies" },
};

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const [{ service }, services, caseStudies] = await Promise.all([
    searchParams,
    getServices(),
    getCaseStudies(),
  ]);
  const selected = services.find((item) => item.slug === service);
  const visibleCases = selected
    ? caseStudies.filter((item) => item.serviceSlug === selected.slug)
    : caseStudies;

  return (
    <>
      <PageIntro title="Case Studies" />
      <section className="mx-auto max-w-6xl px-5 md:px-8 pb-16">
        <nav
          className="flex flex-wrap gap-2 border-y border-neutral-300 py-6 md:gap-2.5 [&>a]:inline-flex [&>a]:items-center [&>a]:gap-3 [&>a]:border [&>a]:border-neutral-300 [&>a]:px-[11px] [&>a]:py-[9px] [&>a]:text-[11px] md:[&>a]:px-3.5 md:[&>a]:py-2.5 md:[&>a]:text-xs [&>a[aria-current]]:border-black [&>a[aria-current]]:bg-black [&>a[aria-current]]:text-white [&_span]:text-[10px] [&_span]:opacity-70"
          aria-label="Filter case studies by service"
        >
          <Link
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            href="/case-studies"
            aria-current={!selected ? "page" : undefined}
            scroll={false}
          >
            All projects <span>{caseStudies.length}</span>
          </Link>
          {services.map((item) => (
            <Link
              className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              key={item.slug}
              href={`/case-studies?service=${item.slug}`}
              aria-current={selected?.slug === item.slug ? "page" : undefined}
              scroll={false}
            >
              {item.shortTitle}
              <span>
                {
                  caseStudies.filter(
                    (project) => project.serviceSlug === item.slug,
                  ).length
                }
              </span>
            </Link>
          ))}
        </nav>
        <p className="my-6 text-[11px] text-neutral-600">
          {visibleCases.length}{" "}
          {visibleCases.length === 1 ? "project" : "projects"}
          {selected ? ` / ${selected.title}` : ""}
        </p>
        {visibleCases.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {visibleCases.map((item) => (
              <CaseStudyCard
                key={item.slug}
                caseStudy={item}
                headingLevel="h2"
              />
            ))}
          </div>
        ) : null}
      </section>
      <ContactCta />
    </>
  );
}
