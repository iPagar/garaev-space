import type { Metadata } from "next";
import ContactCta from "../components/ContactCta";
import PageIntro from "../components/PageIntro";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import SolutionCard from "../components/SolutionCard";
import { allSolutions } from "../lib/solutions";

export const metadata: Metadata = {
  title: "Who I help",
  description:
    "Full-stack engineering for investigation teams, independent publishers, mission-driven operations, and product agencies.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <PageIntro
        title="Who I help"
        description="I work best where software supports a specific research, publishing, operational, or client-delivery workflow. These pages explain the problems I can take on without naming past clients."
      />
      <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-14 px-6 sm:grid-cols-2 lg:px-8">
          {allSolutions.map((solution) => (
            <SolutionCard
              key={solution.slug}
              solution={solution}
              headingLevel="h2"
            />
          ))}
        </div>
      </section>
      <ContactCta />
      <SiteFooter />
    </main>
  );
}
