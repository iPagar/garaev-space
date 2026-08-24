import Link from "next/link";
import { contactConfig } from "../lib/contact";

export default function ContactCta() {
  return (
    <section className="border-t border-slate-200 bg-slate-950 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Tell me about the work
            </h2>
            <p className="mt-5 text-lg/8 text-slate-300">
              Send a project brief or details about a role. I work in English
              and Russian and usually reply within one or two business days.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-100"
            >
              Open contact form
            </Link>
            <a
              href={contactConfig.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white hover:text-slate-300"
            >
              Telegram <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
