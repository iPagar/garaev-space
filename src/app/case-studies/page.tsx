import type { Metadata } from "next";
import CaseStudyCard from "../components/CaseStudyCard";
import ContactCta from "../components/ContactCta";
import PageIntro from "../components/PageIntro";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { caseStudies } from "../lib/cases";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Selected full-stack, data platform, and mobile application work by Pavel Garaev.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <PageIntro
        title="Case studies"
        description="Selected systems and product areas I have worked on across web applications, data platforms, and mobile products."
      />
      <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-3 lg:px-8">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard
              key={caseStudy.slug}
              caseStudy={caseStudy}
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
