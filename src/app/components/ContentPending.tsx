import Link from "next/link";

export default function ContentPending({
  title,
  backHref,
  backLabel,
}: {
  title: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <section className="mx-auto min-h-[60vh] max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <Link
        href={backHref}
        className="text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        {backLabel}
      </Link>
      <h1 className="mt-10 text-4xl font-medium md:text-5xl">{title}</h1>
      <Link
        href="/contact"
        className="mt-8 inline-block border border-black px-5 py-3 text-sm font-medium hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        Discuss a project
      </Link>
    </section>
  );
}
