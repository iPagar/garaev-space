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
      className="group block h-full animate-fade-in"
    >
      <div className="flex h-full flex-col rounded-lg border border-muted/20 bg-background p-6 transition-all duration-300 hover:border-muted/40">
        <div className="mb-4 flex items-start gap-4">
          {metadata.image && (
            <div className="shrink-0 overflow-hidden rounded-lg bg-white">
              <img
                src={metadata.image}
                alt={metadata.title}
                className="h-16 w-16 rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="mb-2 text-xl font-light text-foreground transition-colors duration-300 group-hover:text-foreground">
              {metadata.title}
            </h3>
            {metadata.description && (
              <p className="text-sm leading-relaxed text-muted line-clamp-2">
                {metadata.description}
              </p>
            )}
          </div>
        </div>
        {metadata.screenshots && metadata.screenshots.length > 0 && (
          <div
            className={
              isWebsite
                ? "mt-auto overflow-hidden rounded-lg"
                : "mt-auto flex gap-2 overflow-x-auto pb-2"
            }
          >
            {metadata.screenshots.map((screenshot, index) => (
              <div
                key={index}
                className={
                  isWebsite ? "" : "shrink-0 overflow-hidden rounded-lg"
                }
              >
                <img
                  src={screenshot}
                  alt={`${metadata.title} screenshot ${index + 1}`}
                  className={
                    isWebsite
                      ? "h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
