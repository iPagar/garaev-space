import type { Metadata } from "next";
import SolutionLanding from "../components/SolutionLanding";
import { agencySolution } from "../lib/solutions";

export const metadata: Metadata = {
  title: agencySolution.title,
  description: agencySolution.metaDescription,
  alternates: { canonical: agencySolution.path },
  openGraph: {
    description: agencySolution.metaDescription,
    images: [{ alt: agencySolution.imageAlt, url: agencySolution.image }],
    title: agencySolution.title,
    url: agencySolution.path,
  },
};

export default function ForAgenciesPage() {
  return <SolutionLanding solution={agencySolution} />;
}
