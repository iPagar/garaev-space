import Link from "next/link";
import { navigation } from "../lib/navigation";
import { siteConfig } from "../lib/site";
import { socialLinks } from "../lib/social-icons";

export default function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row">
        <Link
          href="/"
          className="font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Contact
          </Link>
        </nav>
      </div>
      <div className="mt-8 flex flex-col justify-between gap-6 border-t border-neutral-300 pt-6 text-xs text-neutral-600 sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex items-center gap-5">
          {socialLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              title={item.label}
              className="inline-flex size-10 items-center justify-center text-black hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              <item.icon className="size-5" aria-hidden="true" />
            </a>
          ))}
          <Link
            href="/privacy"
            className="hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
