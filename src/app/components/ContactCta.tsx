import Link from "next/link";
import { contactConfig } from "../lib/contact";

export default function ContactCta() {
  return (
    <section className="border-y border-neutral-300">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-12 md:flex-row md:items-center md:px-8">
        <h2 className="text-2xl font-medium md:text-3xl">
          Let’s work together
        </h2>
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/contact"
            className="border border-black px-5 py-3 text-sm font-medium hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Discuss a project
          </Link>
          <a
            href={`mailto:${contactConfig.email}`}
            className="text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            {contactConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
}
