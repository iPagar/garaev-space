import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactCta from "../../components/ContactCta";
import ServiceCard from "../../components/ServiceCard";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { caseStudies, getCaseStudyBySlug } from "../../lib/cases";
import { services } from "../../lib/services";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return { title: "Case study not found" };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.metaDescription,
    alternates: { canonical: `/case-studies/${caseStudy.slug}` },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const relatedServices = services.filter((service) =>
    caseStudy.relatedServiceSlugs.includes(service.slug),
  );

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <article>
        <header className="border-b border-slate-200 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              href="/case-studies"
              className="text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              ← All case studies
            </Link>
            <div className="mt-10 max-w-4xl">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-slate-950 sm:text-6xl">
                {caseStudy.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg/8 text-slate-600">
                {caseStudy.summary}
              </p>
            </div>
          </div>
        </header>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                Context
              </h2>
              <p className="mt-6 text-lg/8 text-slate-600">
                {caseStudy.context}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                My contribution
              </h2>
              <ul className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
                {caseStudy.contribution.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 py-4 text-base/7 text-slate-700"
                  >
                    <span aria-hidden="true" className="text-blue-700">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                Delivered work
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {caseStudy.delivered.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 bg-white p-5 text-sm/6 font-medium text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                Result
              </h2>
              <p className="mt-8 text-lg/8 text-slate-600">
                {caseStudy.result}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {caseStudy.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </article>

      {relatedServices.length > 0 ? (
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Related services
            </h2>
            <div className="mt-10 grid gap-x-8 gap-y-12 lg:grid-cols-3">
              {relatedServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
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
