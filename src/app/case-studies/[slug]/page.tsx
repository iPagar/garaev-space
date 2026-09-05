import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPending from "../../components/ContentPending";
import { getCaseStudies, getCaseStudyBySlug } from "../../lib/cases";

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
    robots: { index: false, follow: true },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const item = await getCaseStudyBySlug((await params).slug);
  if (!item) notFound();
  return (
    <ContentPending
      title={item.title}
      backHref="/case-studies"
      backLabel="All case studies"
    />
  );
}
