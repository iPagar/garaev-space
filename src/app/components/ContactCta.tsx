import Link from "next/link";
import { contactConfig } from "../lib/contact";

export default function ContactCta() {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-zinc-800/80 bg-zinc-900/40 px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-zinc-100 sm:text-5xl">
                Get in touch
              </h2>
              <p className="mt-5 max-w-xl text-base/7 text-zinc-400">
                If you have a product to build, redesign, or review, send the
                core details and I will get back with the next step.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-[1.75rem] bg-zinc-50/5 p-8">
                <h3 className="text-base/7 font-semibold text-zinc-100">
                  Project inquiry
                </h3>
                <p className="mt-3 text-sm/6 text-zinc-400">
                  Use the form for new projects, redesigns, audits, or product
                  consulting.
                </p>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="text-sm/6 font-semibold text-zinc-100 hover:text-zinc-300"
                  >
                    Open the form <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-zinc-50/5 p-8">
                <h3 className="text-base/7 font-semibold text-zinc-100">
                  Telegram
                </h3>
                <div className="mt-3 space-y-1 text-sm/6 text-zinc-400">
                  <p>
                    <a
                      href={contactConfig.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-zinc-100 hover:text-zinc-300"
                    >
                      {contactConfig.telegramHandle}
                    </a>
                  </p>
                  <p>Fastest way to reach me directly.</p>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-zinc-50/5 p-8">
                <h3 className="text-base/7 font-semibold text-zinc-100">
                  Email
                </h3>
                <div className="mt-3 space-y-1 text-sm/6 text-zinc-400">
                  <p>
                    <a
                      href={`mailto:${contactConfig.email}`}
                      className="font-semibold text-zinc-100 hover:text-zinc-300"
                    >
                      {contactConfig.email}
                    </a>
                  </p>
                  <p>Best if you prefer a written brief.</p>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-zinc-50/5 p-8">
                <h3 className="text-base/7 font-semibold text-zinc-100">
                  Response time
                </h3>
                <div className="mt-3 space-y-1 text-sm/6 text-zinc-400">
                  <p>{contactConfig.responseTime}</p>
                  <p>English and Russian both work.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
