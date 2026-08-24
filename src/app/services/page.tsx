import type { Metadata } from "next";
import ContactCta from "../components/ContactCta";
import PageIntro from "../components/PageIntro";
import ServiceCard from "../components/ServiceCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { services } from "../lib/services";

export const metadata: Metadata = {
  title: "Engineering services",
  description:
    "Web application, Next.js, and React Native development by Pavel Garaev.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <PageIntro
        title="Engineering services"
        description="I work on production web applications, Next.js products, and React Native apps. Each engagement can cover a complete product area or focused work in an existing system."
      />
      <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-12 px-6 lg:grid-cols-3 lg:px-8">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
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
