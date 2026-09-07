import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../lib/site";

export default function HomeHero() {
  return (
    <section className="mx-auto grid min-h-[calc(100svh-var(--site-header-height))] max-w-6xl content-center items-center gap-10 px-5 py-10 md:grid-cols-2 md:gap-12 md:px-8 md:py-16">
      <div>
        <h1 className="text-4xl font-medium md:text-6xl">{siteConfig.name}</h1>
        <p className="mt-6 max-w-xl text-xl/8 md:text-2xl/9">
          {siteConfig.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link
            href="/contact"
            className="border border-black px-5 py-3 text-sm font-medium hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Discuss a project
          </Link>
          <Link
            href="/case-studies"
            className="text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Explore the work
          </Link>
        </div>
      </div>
      <div className="relative aspect-square w-[min(100%,28svh)] justify-self-center md:w-full">
        <Image
          src="/hero-sculpture.png"
          alt=""
          fill
          preload
          sizes="(max-width: 767px) 28svh, (max-width: 1151px) 50vw, 520px"
          className="object-contain"
        />
      </div>
    </section>
  );
}
