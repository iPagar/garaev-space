import Link from "next/link";
import type { Service } from "../lib/services";
import ServiceVisual from "./ServiceVisual";

export default function ServiceCard({
  headingLevel = "h3",
  service,
  visual = false,
}: {
  headingLevel?: "h2" | "h3";
  service: Service;
  visual?: boolean;
}) {
  const Heading = headingLevel;

  if (visual) {
    return (
      <article id={service.slug} className="min-w-0 border border-neutral-300">
        <Link
          href={`/services/${service.slug}`}
          className="group flex h-full flex-col hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          <div className="flex h-56 items-center justify-center overflow-hidden border-b border-neutral-200 bg-neutral-50 px-5 sm:h-64">
            <ServiceVisual slug={service.slug} />
          </div>
          <div className="flex flex-1 flex-col p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <Heading className="text-xl/7 font-medium group-hover:underline underline-offset-4">
                {service.title}
              </Heading>
              <span aria-hidden="true" className="text-xl text-neutral-500">
                ↗
              </span>
            </div>
            <p className="mt-4 text-sm/7 text-neutral-600">
              {service.shortDescription}
            </p>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article
      id={service.slug}
      className="grid gap-4 border-t border-neutral-300 py-8 last:border-b md:grid-cols-2 md:gap-12"
    >
      <Heading className="text-xl font-medium">
        <Link
          href={`/services/${service.slug}`}
          className="hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          {service.title}
        </Link>
      </Heading>
      <p className="text-sm/7 text-neutral-600">{service.shortDescription}</p>
    </article>
  );
}
