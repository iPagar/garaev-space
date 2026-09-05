import type { Metadata } from "next";
import PageIntro from "../components/PageIntro";
import { contactConfig } from "../lib/contact";
import { siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How this website handles contact messages and website measurement.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro title="Privacy Policy" />
      <div className="mx-auto max-w-6xl px-5 md:px-8 pb-16">
        <div className="max-w-[780px] [&>section]:mb-9 [&_h2]:mb-4 [&_h2]:text-[23px] [&_h2]:font-medium [&_h2]:[&_p]:text-[15px]/[1.9] [&_p]:text-neutral-600 [&_a]:underline [&_a]:underline-offset-4">
          <section>
            <h2>Who to contact</h2>
            <p>
              This is the personal website of {siteConfig.name}. For questions
              about your information, email{" "}
              <a
                className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                href={`mailto:${contactConfig.email}`}
              >
                {contactConfig.email}
              </a>
              .
            </p>
          </section>
          <section>
            <h2>When you send a message</h2>
            <p>
              The contact form collects your name, email address, project
              details, and organization if you choose to provide it. This
              information is sent by email and used to read your inquiry, reply,
              and discuss the work. Please include only the information needed
              for that conversation.
            </p>
          </section>
          <section>
            <h2>Email delivery and storage</h2>
            <p>
              Messages pass through the website’s email delivery provider and
              are stored in the recipient’s mailbox. If you would like to ask
              about a message you sent, request a correction, or request its
              deletion, contact me at the email address above.
            </p>
          </section>
          <section>
            <h2>Website measurement</h2>
            <p>
              This website loads Google Tag Manager to manage measurement tags
              and records an event when the contact form is submitted
              successfully. The event does not include your name, email,
              organization, or message. Google Tag Manager connects to Google
              services; information about their handling of data is available in{" "}
              <a
                className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google’s Privacy Policy
              </a>
              .
            </p>
          </section>
          <section>
            <h2>External services</h2>
            <p>
              Links to LinkedIn and Telegram take you to those services. If you
              contact me there, their privacy policies apply to your use of
              those platforms.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
