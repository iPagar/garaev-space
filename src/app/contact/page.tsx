import type { Metadata } from "next";
import PageIntro from "../components/PageIntro";
import ProjectInquiryForm from "../components/ProjectInquiryForm";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Pavel Garaev about a software project or an engineering role.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <PageIntro
        title="Contact"
        description="Send details about a software project or an engineering role. I work in English and Russian and usually reply within one or two business days."
      />
      <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ProjectInquiryForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
