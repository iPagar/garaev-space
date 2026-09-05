import type { Metadata } from "next";
import PageIntro from "../components/PageIntro";
import ProjectInquiryForm from "../components/ProjectInquiryForm";
import { contactConfig } from "../lib/contact";
import { siteConfig } from "../lib/site";
import { socialLinks } from "../lib/social-icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Discuss a project or engineering role with ${siteConfig.name}. Send a message or get in touch by email, Telegram, or LinkedIn.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Contact" />
      <section className="mx-auto max-w-6xl px-5 md:px-8 grid items-start gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 pb-16">
        <ProjectInquiryForm />
        <aside className="min-w-0 pt-2">
          <a
            href={`mailto:${contactConfig.email}`}
            className="text-lg font-medium wrap-anywhere underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            {contactConfig.email}
          </a>
          <p className="text-neutral-600 text-sm/7 mt-6">
            {contactConfig.responseTime}
            <br />
            English or Russian is welcome.
          </p>
          <div className="mt-8 grid [&>a]:flex [&>a]:justify-between [&>a]:border-t [&>a]:border-neutral-300 [&>a]:py-[17px] [&>a]:text-sm [&>a]:hover:text-black">
            {socialLinks.map((item) => (
              <a
                className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-flex items-center gap-3">
                  <item.icon className="size-5 shrink-0" aria-hidden="true" />
                  {item.label}
                </span>
              </a>
            ))}
          </div>
          <div className="mt-[35px] border-t border-neutral-300 pt-6 [&>p]:mt-3 [&>p]:mb-4 [&>p]:text-[13px]/[1.8] [&>p]:text-neutral-600">
            <h2 className="text-sm font-medium">Hiring for your team?</h2>
            <p>I’m also open to conversations about engineering roles.</p>
          </div>
        </aside>
      </section>
    </>
  );
}
