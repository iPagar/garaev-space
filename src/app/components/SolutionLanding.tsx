import Image from "next/image";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import type { Solution } from "../lib/solutions";
import ContactCta from "./ContactCta";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function SolutionLanding({ solution }: { solution: Solution }) {
  const serviceSchemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    audience: {
      "@type": "Audience",
      audienceType: solution.audience,
    },
    description: solution.metaDescription,
    name: solution.title,
    provider: {
      "@type": "Person",
      name: "Pavel Garaev",
      url: "https://pavelgaraev.com",
    },
    url: `https://pavelgaraev.com${solution.path}`,
  }).replace(/</g, "\\u003c");

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This JSON is generated from static solution data and markup characters are escaped.
        dangerouslySetInnerHTML={{ __html: serviceSchemaJson }}
      />

      <section className="relative border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 py-16 sm:py-20 lg:col-span-7 lg:px-0 lg:py-28 xl:col-span-6">
            <div className="mx-auto max-w-xl lg:mx-0">
              <p className="text-sm/6 font-semibold text-blue-700">
                {solution.eyebrow}
              </p>
              <h1 className="mt-4 max-w-xl text-5xl font-semibold tracking-tight text-pretty text-slate-950 sm:text-6xl">
                {solution.title}
              </h1>
              <p className="mt-7 max-w-lg text-lg/8 text-slate-600">
                {solution.description}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  className="rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
                >
                  Discuss the work
                </Link>
                <Link
                  href={solution.proof.href}
                  className="text-sm/6 font-semibold text-slate-950 hover:text-blue-700"
                >
                  See relevant work <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative min-h-80 lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-y-0 xl:right-0 xl:left-1/2 xl:mr-0">
            <Image
              src={solution.image}
              alt={solution.imageAlt}
              fill
              priority
              sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-x-12 gap-y-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="text-sm/6 font-semibold text-blue-700">
                Problems I can work on
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-pretty text-slate-950 sm:text-5xl">
                When the workflow is getting in the way
              </h2>
              <p className="mt-6 text-base/7 text-slate-600">
                {solution.audience}
              </p>
            </div>
            <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-y-14">
              {solution.problems.map((problem) => (
                <div key={problem.title} className="relative pl-9">
                  <dt className="font-semibold text-slate-950">
                    <FiCheck
                      aria-hidden="true"
                      className="absolute top-1 left-0 size-5 text-blue-700"
                    />
                    {problem.title}
                  </dt>
                  <dd className="mt-2 text-base/7 text-slate-600">
                    {problem.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm/6 font-semibold text-blue-700">
              What the engagement can deliver
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              A useful system, not another layer of process
            </h2>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {solution.outcomes.map((outcome) => (
              <article key={outcome.title} className="max-w-xl">
                <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                  {outcome.title}
                </h3>
                <p className="mt-3 text-base/7 text-slate-600">
                  {outcome.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:px-8">
          <div>
            <p className="text-sm/6 font-semibold text-blue-700">
              Relevant experience
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {solution.proof.title}
            </h2>
            <p className="mt-6 text-lg/8 text-slate-600">
              {solution.proof.description}
            </p>
            <Link
              href={solution.proof.href}
              className="mt-8 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              {solution.proof.linkLabel} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className="divide-y divide-slate-200">
            {solution.proof.points.map((point) => (
              <li
                key={point}
                className="flex gap-4 py-5 text-base/7 text-slate-700"
              >
                <FiCheck
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-blue-700"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              When this work fits
            </h2>
          </div>
          <ul className="mt-10 grid gap-8 lg:grid-cols-3">
            {solution.fit.map((item) => (
              <li key={item} className="flex gap-4 text-base/7 text-slate-700">
                <FiCheck
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-blue-700"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Questions before we start
              </h2>
              <p className="mt-4 max-w-md text-base/7 text-slate-600">
                If the situation is not covered here, send a short description
                of the workflow, product, or delivery gap.
              </p>
            </div>
            <dl className="mt-10 space-y-10 lg:col-span-7 lg:mt-0">
              {solution.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-base/7 font-semibold text-slate-950">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base/7 text-slate-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ContactCta />
      <SiteFooter />
    </main>
  );
}
