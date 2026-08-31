import Link from "next/link";
import type { Solution } from "../lib/solutions";

export default function SolutionCard({
  headingLevel = "h3",
  solution,
}: {
  headingLevel?: "h2" | "h3";
  solution: Solution;
}) {
  const Heading = headingLevel;

  return (
    <article className="flex h-full flex-col border-t border-slate-300 pt-6">
      <p className="text-sm/6 font-semibold text-blue-700">
        {solution.eyebrow}
      </p>
      <Heading className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
        {solution.title}
      </Heading>
      <p className="mt-4 flex-auto text-base/7 text-slate-600">
        {solution.description}
      </p>
      <Link
        href={solution.path}
        className="mt-6 text-sm font-semibold text-blue-700 hover:text-blue-900"
      >
        See how I can help <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
