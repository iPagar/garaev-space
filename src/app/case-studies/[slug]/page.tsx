import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudyCard from "../../components/CaseStudyCard";
import CaseStudyImage from "../../components/CaseStudyImage";
import ContactCta from "../../components/ContactCta";
import ContentBody from "../../components/ContentBody";
import ContentPending from "../../components/ContentPending";
import { getCaseStudies, getCaseStudyBySlug } from "../../lib/cases";
import { parseContentBlocks } from "../../lib/content-blocks";
import { getServiceBySlug } from "../../lib/services";

type CaseStudyPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const item = await getCaseStudyBySlug((await params).slug);
  if (!item) notFound();
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/case-studies/${item.slug}` },
    robots: { index: !item.draft, follow: true },
    openGraph: {
      title: item.title,
      description: item.summary,
      type: "article",
      url: `/case-studies/${item.slug}`,
      images: [{ url: item.coverImage, alt: item.coverAlt }],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const item = await getCaseStudyBySlug((await params).slug);
  if (!item) notFound();
  if (item.draft)
    return (
      <ContentPending
        title={item.title}
        backHref="/case-studies"
        backLabel="All case studies"
      />
    );
  const [service, cases] = await Promise.all([
    getServiceBySlug(item.serviceSlug),
    getCaseStudies(),
  ]);
  if (!service) throw new Error(`Missing service for case study: ${item.slug}`);
  const related = cases
    .filter((other) => !other.draft && other.slug !== item.slug)
    .sort(
      (a, b) =>
        Number(b.serviceSlug === item.serviceSlug) -
        Number(a.serviceSlug === item.serviceSlug),
    )
    .slice(0, 2);
  const blocks = parseContentBlocks(item.body);

  return (
    <>
      <article className="mx-auto max-w-6xl px-5 pt-10 pb-16 md:px-8 md:pt-16">
        <Link
          href="/case-studies"
          className="text-sm text-neutral-600 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          All case studies
        </Link>
        <header className="mt-10">
          <p className="mb-4 text-xs text-neutral-500">{item.projectType}</p>
          <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
            {item.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl/8 text-neutral-600 md:text-2xl/9">
            {item.summary}
          </p>
          <dl className="mt-8 grid gap-6 border-y border-neutral-300 py-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="mb-2 text-neutral-500">Scope</dt>
              <dd>{item.role}</dd>
            </div>
            <div>
              <dt className="mb-2 text-neutral-500">Service</dt>
              <dd>
                <Link
                  href={
                    service.draft
                      ? `/services#${service.slug}`
                      : `/services/${service.slug}`
                  }
                  className="underline underline-offset-4"
                >
                  {service.title}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="mb-2 text-neutral-500">Next step</dt>
              <dd>
                {item.projectUrl ? (
                  <a
                    href={item.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    Visit the project ↗
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="underline underline-offset-4"
                  >
                    Discuss similar work
                  </Link>
                )}
              </dd>
            </div>
          </dl>
        </header>
        <CaseStudyImage
          src={item.coverImage}
          alt={item.coverAlt}
          caption={item.coverCaption}
          priority
        />
        <ContentBody blocks={blocks} />
      </article>
      <section
        className="mx-auto max-w-6xl border-t border-neutral-300 px-5 py-12 md:px-8"
        aria-labelledby="related-case-studies"
      >
        <h2 id="related-case-studies" className="mb-8 text-2xl font-medium">
          More case studies
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {related.map((other) => (
            <CaseStudyCard key={other.slug} caseStudy={other} />
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
