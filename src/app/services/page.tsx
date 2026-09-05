import type { Metadata } from "next";
import ContactCta from "../components/ContactCta";
import PageIntro from "../components/PageIntro";
import ServiceCard from "../components/ServiceCard";
import { getServices } from "../lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design and engineering for AI systems, websites, web applications, mobile apps, bots, automation, and desktop tools.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageIntro title="Services" titleId="services-title" />
      <section
        className="mx-auto max-w-6xl px-5 md:px-8 pb-16"
        aria-labelledby="services-title"
      >
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} headingLevel="h2" />
        ))}
      </section>
      <ContactCta />
    </>
  );
}
