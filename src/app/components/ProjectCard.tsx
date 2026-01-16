import { fetchProjectMetadata } from "../lib/metadata";

interface ProjectCardProps {
  url: string;
}

export default async function ProjectCard({ url }: ProjectCardProps) {
  const metadata = await fetchProjectMetadata(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block animate-fade-in"
    >
      <div className="rounded-lg border border-muted/20 bg-background p-6 transition-all duration-300 hover:border-muted/40">
        {metadata.image && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={metadata.image}
              alt={metadata.title}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <h3 className="mb-2 text-xl font-light text-foreground transition-colors duration-300 group-hover:text-foreground">
          {metadata.title}
        </h3>
        {metadata.description && (
          <p className="text-sm leading-relaxed text-muted line-clamp-3">
            {metadata.description}
          </p>
        )}
      </div>
    </a>
  );
}
