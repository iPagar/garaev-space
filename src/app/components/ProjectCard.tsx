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
      <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
        <div className="mb-4 flex items-start gap-4">
          {metadata.image && (
            <div className="shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
              {/* biome-ignore lint/performance/noImgElement: Metadata images can come from variable third-party hosts. */}
              <img
                src={metadata.image}
                alt={metadata.title}
                className="h-16 w-16 rounded-2xl object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {isWebsite ? "Website" : "App"}
              </span>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-950 transition-colors duration-300 group-hover:text-blue-700">
              {metadata.title}
            </h3>
            {metadata.description && (
              <p className="line-clamp-3 text-sm leading-7 text-slate-600">
                {metadata.description}
              </p>
            )}
          </div>
        </div>
        {metadata.screenshots && metadata.screenshots.length > 0 && (
          <div
            className={
              isWebsite
                ? "mt-auto overflow-hidden rounded-xl border border-slate-200"
                : "mt-auto flex gap-2 overflow-x-auto pb-2"
            }
          >
            {metadata.screenshots.map((screenshot, index) => (
              <div
                key={screenshot}
                className={
                  isWebsite
                    ? ""
                    : "shrink-0 overflow-hidden rounded-xl border border-slate-200"
                }
              >
                {/* biome-ignore lint/performance/noImgElement: Screenshots can come from variable third-party hosts. */}
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
