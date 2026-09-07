import Link from "next/link";
import type { ReactNode } from "react";

export default function MarkdownInline({ content }: { content: string }) {
  const parts: ReactNode[] = [];
  const tokens =
    /`([^`\n]+)`|\[([^\]\n]+)\]\((https:\/\/[^\s)]+|\/(?!\/)[^\s)]*)\)/g;
  let cursor = 0;

  for (const match of content.matchAll(tokens)) {
    parts.push(content.slice(cursor, match.index));

    if (match[1] !== undefined) {
      parts.push(
        <code
          key={match.index}
          className="break-words bg-neutral-100 px-1.5 py-0.5 text-[0.9em] text-neutral-950"
        >
          {match[1]}
        </code>,
      );
    } else {
      parts.push(
        <Link
          key={match.index}
          href={match[3]}
          className="underline decoration-neutral-400 underline-offset-4 hover:decoration-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          {match[2]}
        </Link>,
      );
    }

    cursor = match.index + match[0].length;
  }

  parts.push(content.slice(cursor));
  return <>{parts}</>;
}
