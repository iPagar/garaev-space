import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudyCard from "../../components/CaseStudyCard";
import ContactCta from "../../components/ContactCta";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { caseStudies } from "../../lib/cases";
import { getServiceBySlug, services } from "../../lib/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service not found" };
  }

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedCases = caseStudies.filter((caseStudy) =>
    service.relatedCaseSlugs.includes(caseStudy.slug),
  );

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "Person",
      name: "Pavel Garaev",
      url: "https://pavelgaraev.com",
    },
    url: `https://pavelgaraev.com/services/${service.slug}`,
  };
  const serviceSchemaJson = JSON.stringify(serviceSchema).replace(
    /</g,
    "\\u003c",
  );

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This JSON is generated from static service data and markup characters are escaped.
        dangerouslySetInnerHTML={{ __html: serviceSchemaJson }}
      />

      <section className="border-b border-slate-200 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link
            href="/services"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            ← All services
          </Link>
          <div className="mt-10 max-w-4xl">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-slate-950 sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg/8 text-slate-600">
              {service.description}
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Discuss the work
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              What I can cover
            </h2>
            <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {service.scope.map((item) => (
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
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              When this work fits
            </h2>
            <ul className="mt-8 grid gap-4">
              {service.situations.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-base/7 text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            Main tools
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {service.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {relatedCases.length > 0 ? (
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Related case studies
            </h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {relatedCases.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
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
