import { fetchProjectMetadata } from "../lib/metadata";

interface ProjectCardProps {
  url: string;
}

export default async function ProjectCard({ url }: ProjectCardProps) {
  const metadata = await fetchProjectMetadata(url);
  const isWebsite = !url.includes("apps.apple.com");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <div className="flex h-full flex-col rounded-[1.75rem] border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600/60">
        <div className="mb-4 flex items-start gap-4">
          {metadata.image && (
            <div className="shrink-0 overflow-hidden rounded-2xl border border-zinc-800/80 bg-white">
              <img
                src={metadata.image}
                alt={metadata.title}
                className="h-16 w-16 rounded-2xl object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-zinc-800/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                {isWebsite ? "Website" : "App"}
              </span>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-zinc-100 transition-colors duration-300 group-hover:text-zinc-300">
              {metadata.title}
            </h3>
            {metadata.description && (
              <p className="line-clamp-3 text-sm leading-7 text-zinc-400">
                {metadata.description}
              </p>
            )}
          </div>
        </div>
        {metadata.screenshots && metadata.screenshots.length > 0 && (
          <div
            className={
              isWebsite
                ? "mt-auto overflow-hidden rounded-[1.25rem] border border-zinc-800/80"
                : "mt-auto flex gap-2 overflow-x-auto pb-2"
            }
          >
            {metadata.screenshots.map((screenshot, index) => (
              <div
                key={screenshot}
                className={
                  isWebsite
                    ? ""
                    : "shrink-0 overflow-hidden rounded-[1.25rem] border border-zinc-800/80"
                }
              >
                <img
                  src={screenshot}
                  alt={`${metadata.title} screenshot ${index + 1}`}
                  className={
                    isWebsite
                      ? "h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      : "h-32 w-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
