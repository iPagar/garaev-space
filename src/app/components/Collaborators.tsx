import { clients, collaborators } from "../lib/collaborators";
import MediaPlaceholder from "./MediaPlaceholder";

export default function Collaborators() {
  return (
    <div className="space-y-6">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {clients.map((name) => (
          <li key={name} className="border border-neutral-300 p-5">
            <MediaPlaceholder label="Logo" className="mb-5 aspect-[3/2]" />
            <h3 className="text-sm font-medium">{name}</h3>
          </li>
        ))}
      </ul>
      <ul className="grid gap-4 sm:grid-cols-2">
        {collaborators.map((name) => (
          <li key={name} className="border border-neutral-300 p-5">
            <div className="flex items-center gap-4">
              <MediaPlaceholder
                label="Photo"
                className="size-14 rounded-full"
              />
              <h3 className="text-sm font-medium">{name}</h3>
            </div>
            <p className="mt-5 border-t border-dashed border-neutral-300 pt-5 text-sm text-neutral-500">
              Testimonial placeholder
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
