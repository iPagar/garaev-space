"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "../lib/navigation";
import { siteConfig } from "../lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 min-h-[var(--site-header-height)] border-b border-neutral-300 bg-white">
      <a
        href="#main-content"
        className="absolute -top-24 left-4 z-50 border border-black bg-white px-4 py-3 focus:top-3"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-5 py-5 md:px-8"
      >
        <Link
          href="/"
          className="font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          {siteConfig.name}
        </Link>
        <div className="order-3 flex w-full gap-6 text-sm md:order-none md:ml-auto md:w-auto">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              className="py-1 hover:underline aria-[current=page]:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/contact"
          aria-current={pathname === "/contact" ? "page" : undefined}
          className="ml-auto border border-black px-4 py-2 text-sm font-medium hover:bg-neutral-100 aria-[current=page]:bg-black aria-[current=page]:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:ml-0"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
