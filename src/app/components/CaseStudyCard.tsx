import Link from "next/link";
import type { CaseStudy } from "../lib/cases";
import { getServiceBySlug } from "../lib/services";

export default async function CaseStudyCard({
  caseStudy,
  headingLevel = "h3",
}: {
  caseStudy: CaseStudy;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const service = await getServiceBySlug(caseStudy.serviceSlug);
  if (!service)
    throw new Error(`Missing service for case study: ${caseStudy.slug}`);

  return (
    <article className="min-w-0 border border-neutral-300">
      <Link
        href={`/case-studies/${caseStudy.slug}`}
        className="flex h-full flex-col items-start gap-4 p-6 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        <p className="text-xs text-neutral-600">{service.shortTitle}</p>
        <Heading className="text-2xl font-medium">{caseStudy.title}</Heading>
        {caseStudy.summary && (
          <p className="text-sm/7 text-neutral-600">{caseStudy.summary}</p>
        )}
      </Link>
    </article>
  );
}
