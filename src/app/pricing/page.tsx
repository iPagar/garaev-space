import type { Metadata } from "next";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import PricingFaq from "../components/PricingFaq";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { pricingFaqs, projectRanges } from "../lib/pricing";

export const metadata: Metadata = {
  title: "Project pricing",
  description:
    "Typical pricing for focused engineering work, product milestones, and full product delivery by Pavel Garaev.",
  alternates: { canonical: "/pricing" },
};

const pricingSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Product engineering",
      description:
        "Full-stack product engineering for focused delivery, product milestones, and end-to-end releases.",
      provider: {
        "@type": "Person",
        name: "Pavel Garaev",
        url: "https://pavelgaraev.com",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: 1500,
        highPrice: 30000,
        priceCurrency: "USD",
        offerCount: projectRanges.length,
      },
      url: "https://pavelgaraev.com/pricing",
    },
    {
      "@type": "FAQPage",
      mainEntity: pricingFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
}).replace(/</g, "\\u003c");

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This JSON is generated from static pricing data and markup characters are escaped.
        dangerouslySetInnerHTML={{ __html: pricingSchemaJson }}
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl lg:mx-0">
            <p className="text-sm/6 font-semibold text-blue-700">Pricing</p>
            <h1 className="mt-4 max-w-2xl text-5xl font-semibold tracking-tight text-balance text-slate-950 sm:text-6xl">
              Clear ranges for product engineering
            </h1>
            <p className="mt-7 max-w-2xl text-lg/8 text-slate-600">
              Every product is different. These ranges show the usual scale of
              work before I review your goals, codebase, dependencies, and
              delivery constraints.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {projectRanges.map((range) => (
              <article
                key={range.name}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
              >
                <p className="text-sm/6 font-semibold text-blue-700">
                  {range.name}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {range.price}
                </h2>
                <p className="mt-5 text-sm/6 text-slate-600">
                  {range.description}
                </p>
                <ul className="mt-8 space-y-4">
                  {range.inclusions.map((inclusion) => (
                    <li
                      key={inclusion}
                      className="flex gap-3 text-sm/6 text-slate-700"
                    >
                      <FiCheck
                        aria-hidden="true"
                        className="mt-0.5 size-5 shrink-0 text-blue-700"
                      />
                      {inclusion}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-sm/6 text-slate-600">
              These are typical project ranges, not rigid packages. The exact
              estimate follows a review of scope, access, dependencies, and
              delivery risk.
            </p>
            <Link
              href="/contact"
              className="shrink-0 rounded-md bg-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Describe your project <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm/6 font-semibold text-blue-700">FAQ</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Questions before we start
            </h2>
            <p className="mt-5 text-base/7 text-slate-600">
              The useful answer usually depends on the product, but these are
              the terms I clarify before proposing the work.
            </p>
          </div>
          <PricingFaq items={pricingFaqs} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
