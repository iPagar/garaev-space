import Link from "next/link";
import { socialLinks } from "../lib/site";

const navigation = [
  { href: "/solutions", label: "Who I help" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="text-base font-semibold tracking-tight text-slate-950"
            >
              Pavel Garaev
            </Link>
            <p className="mt-2 max-w-md text-sm/6 text-slate-600">
              Full-stack engineering for AI products, data platforms, web
              applications, and mobile apps.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm/6 text-slate-500">
            © {new Date().getFullYear()} Pavel Garaev
          </p>
          <div className="flex gap-5">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-950"
              >
                <span className="sr-only">{item.label}</span>
                <item.icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
