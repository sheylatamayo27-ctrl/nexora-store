import { cn } from "@/lib/utils";

export function Radio({
  selected,
  onChange,
  label,
  className,
}: {
  selected: boolean;
  onChange?: () => void;
  label: string;
  className?: string;
}) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-3 select-none", className)}>
      <input type="radio" checked={selected} onChange={() => onChange?.()} className="sr-only" />
      <span
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
          selected ? "border-2 border-brand-800" : "border border-border-strong bg-surface"
        )}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-brand-800" />}
      </span>
      <span className="text-body text-text-primary">{label}</span>
    </label>
  );
}
