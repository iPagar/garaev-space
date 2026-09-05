import Link from "next/link";
import type { Service } from "../lib/services";

export default function ServiceCard({
  headingLevel = "h3",
  service,
}: {
  headingLevel?: "h2" | "h3";
  service: Service;
}) {
  const Heading = headingLevel;

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
