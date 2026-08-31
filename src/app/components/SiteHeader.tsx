import Link from "next/link";

const navigation = [
  { href: "/solutions", label: "Solutions" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/blog", label: "Writing" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <nav
        aria-label="Global navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-8"
      >
        <Link
          href="/"
          className="shrink-0 text-base font-semibold tracking-tight text-slate-950"
        >
          Pavel Garaev
        </Link>

        <div className="hidden items-center gap-8 md:flex">
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

        <Link
          href="/contact"
          className="rounded-md bg-slate-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
