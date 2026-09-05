import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudyCard from "../../components/CaseStudyCard";
import ContactCta from "../../components/ContactCta";
import ContentBody from "../../components/ContentBody";
import ContentPending from "../../components/ContentPending";
import { getCaseStudies } from "../../lib/cases";
import { parseContentBlocks } from "../../lib/content-blocks";
import { getServiceBySlug, getServices } from "../../lib/services";

type ServicePageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = await getServiceBySlug((await params).slug);
  if (!service) notFound();
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    robots: { index: !service.draft, follow: true },
    openGraph: {
      title: service.title,
      description: service.shortDescription,
      url: `/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getServiceBySlug((await params).slug);
  if (!service) notFound();
  if (service.draft)
    return (
      <ContentPending
        title={service.title}
        backHref="/services"
        backLabel="All services"
      />
    );

  const cases = await getCaseStudies();
  const selectedCases = service.caseStudySlugs.map((slug) => {
    const item = cases.find(
      (candidate) => candidate.slug === slug && !candidate.draft,
    );
    if (!item)
      throw new Error(
        `Missing published case study ${slug} for service ${service.slug}`,
      );
    return item;
  });

  return (
    <>
      <article className="mx-auto max-w-6xl px-5 pt-10 pb-16 md:px-8 md:pt-16">
        <Link
          href="/services"
          className="text-sm text-neutral-600 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          All services
        </Link>
        <header className="mt-10 border-b border-neutral-300 pb-10">
          <h1 className="max-w-4xl text-4xl font-medium tracking-tight md:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl/8 text-neutral-600 md:text-2xl/9">
            {service.shortDescription}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="border border-black px-5 py-3 text-sm font-medium hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              Discuss a project
            </Link>
            <a
              href="#selected-work"
              className="text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Explore related work
            </a>
          </div>
        </header>
        <ContentBody blocks={parseContentBlocks(service.body)} />
      </article>
      <section
        id="selected-work"
        className="mx-auto max-w-6xl scroll-mt-24 border-t border-neutral-300 px-5 py-12 md:px-8"
        aria-labelledby="selected-work-title"
      >
        <h2
          id="selected-work-title"
          className="text-2xl font-medium md:text-3xl"
        >
          Selected work
        </h2>
        <p className="mt-4 mb-8 max-w-3xl text-base/8 text-neutral-600">
          {service.caseStudyIntro}
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {selectedCases.map((item) => (
            <CaseStudyCard key={item.slug} caseStudy={item} />
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
