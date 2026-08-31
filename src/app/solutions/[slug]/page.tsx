import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionLanding from "../../components/SolutionLanding";
import { getSolutionBySlug, solutions } from "../../lib/solutions";

type SolutionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return { title: "Solution not found" };
  }

  return {
    title: solution.title,
    description: solution.metaDescription,
    alternates: { canonical: solution.path },
    openGraph: {
      description: solution.metaDescription,
      images: [{ alt: solution.imageAlt, url: solution.image }],
      title: solution.title,
      url: solution.path,
    },
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return <SolutionLanding solution={solution} />;
}
