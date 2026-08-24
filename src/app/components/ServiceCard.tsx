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
    <article className="flex h-full flex-col border-t border-slate-300 pt-6">
      <Heading className="text-xl font-semibold tracking-tight text-slate-950">
        {service.title}
      </Heading>
      <p className="mt-4 flex-auto text-base/7 text-slate-600">
        {service.shortDescription}
      </p>
      <Link
        href={`/services/${service.slug}`}
        className="mt-6 text-sm font-semibold text-blue-700 hover:text-blue-900"
      >
        View service <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
