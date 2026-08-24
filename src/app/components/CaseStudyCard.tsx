import Link from "next/link";
import type { CaseStudy } from "../lib/cases";

export default function CaseStudyCard({
  caseStudy,
  headingLevel = "h3",
}: {
  caseStudy: CaseStudy;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:p-8">
      <Heading className="text-2xl font-semibold tracking-tight text-slate-950">
        {caseStudy.title}
      </Heading>
      <p className="mt-4 flex-auto text-base/7 text-slate-600">
        {caseStudy.summary}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {caseStudy.stack.slice(0, 4).map((item) => (
          <span
            key={item}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {item}
          </span>
        ))}
      </div>
      <Link
        href={`/case-studies/${caseStudy.slug}`}
        className="mt-8 text-sm font-semibold text-blue-700 hover:text-blue-900"
      >
        Read case study <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
