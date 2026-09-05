import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPending from "../../components/ContentPending";
import { getServiceBySlug, getServices } from "../../lib/services";

type ServicePageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = await getServiceBySlug((await params).slug);
  if (!service) notFound();
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getServiceBySlug((await params).slug);
  if (!service) notFound();
  return (
    <ContentPending
      title={service.title}
      backHref="/services"
      backLabel="All services"
    />
  );
}
