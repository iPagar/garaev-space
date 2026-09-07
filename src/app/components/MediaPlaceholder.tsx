export default function MediaPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={`flex shrink-0 items-center justify-center border border-dashed border-neutral-300 bg-neutral-50 text-xs text-neutral-500 ${className}`}
    >
      <span aria-hidden="true">{label}</span>
    </div>
  );
}
