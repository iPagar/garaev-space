import Link from "next/link";
import ProjectInquiryForm from "../components/ProjectInquiryForm";

export const metadata = {
  title: "Discuss a Project | Pavel Garaev",
  description:
    "Send a short project brief and choose the preferred language for communication.",
};

export default function ContactPage() {
  return (
    <main className="site-shell min-h-screen px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700/60 px-4 py-2 text-sm text-zinc-400 hover:border-zinc-500 hover:text-zinc-100"
        >
          <span aria-hidden="true">←</span>
          Home
        </Link>

        <section className="mt-6 rounded-[2rem] border border-zinc-800/80 bg-zinc-900/40 px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-400">
              Contact
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-balance text-zinc-100 sm:text-6xl">
              Tell me what you need built, fixed, or reviewed.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Send the core details and I will reply with the next step.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <ProjectInquiryForm />
        </section>
      </div>
    </main>
  );
}
