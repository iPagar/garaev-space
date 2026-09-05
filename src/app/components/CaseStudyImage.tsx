import Image from "next/image";
import imageDimensions from "../lib/case-study-images.json";

type ImageDimensions = { width: number; height: number };

export default function CaseStudyImage({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  const dimensions = (imageDimensions as Record<string, ImageDimensions>)[src];
  if (!dimensions) throw new Error(`Missing case study image: ${src}`);

  return (
    <figure className="my-10">
      <div className="flex justify-center overflow-hidden border border-neutral-200 bg-neutral-50 p-3 md:p-6">
        <Image
          src={src}
          alt={alt}
          width={dimensions.width}
          height={dimensions.height}
          sizes="(max-width: 768px) 100vw, 1088px"
          priority={priority}
          className="h-auto max-h-[760px] w-auto max-w-full object-contain"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm/6 text-neutral-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
