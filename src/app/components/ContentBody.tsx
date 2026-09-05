import type { ContentBlock } from "../lib/content-blocks";
import CaseStudyImage from "./CaseStudyImage";

export default function ContentBody({ blocks }: { blocks: ContentBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === "heading") {
      return (
        <h2
          key={block.id}
          id={block.id}
          className="mx-auto mt-14 mb-5 max-w-3xl scroll-mt-24 text-2xl font-medium md:text-3xl"
        >
          {block.text}
        </h2>
      );
    }
    if (block.type === "list") {
      return (
        <ul
          key={`list-${block.items.join("|")}`}
          className="mx-auto mb-6 max-w-3xl list-disc space-y-3 pl-6 text-base/8 text-neutral-700 md:text-lg/8"
        >
          {block.items.map((item, itemIndex) => (
            <li key={`${itemIndex}-${item}`}>{item}</li>
          ))}
        </ul>
      );
    }
    if (block.type === "image") {
      return (
        <CaseStudyImage
          key={block.src}
          src={block.src}
          alt={block.alt}
          caption={block.alt}
        />
      );
    }
    return (
      <p
        key={`${index}-${block.text.slice(0, 24)}`}
        className="mx-auto mb-5 max-w-3xl text-base/8 text-neutral-700 md:text-lg/8"
      >
        {block.text}
      </p>
    );
  });
}
