import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function OptionChip({
  selected,
  disabled,
  children,
  onClick,
  className,
}: {
  selected?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-md border px-4 py-2.5 text-label transition-colors",
        selected
          ? "border-brand-800 bg-brand-100 text-brand-800"
          : "border-border-strong bg-surface text-text-primary hover:border-brand-500",
        disabled && "cursor-not-allowed border-border bg-surface-subtle text-text-muted line-through",
        className
      )}
    >
      {children}
    </button>
  );
}

export function FilterChip({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove?: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-label-sm text-brand-800">
      {children}
      <button type="button" onClick={onRemove} aria-label="Quitar filtro">
        <X className="h-3.5 w-3.5" />
      </button>
    </span>
  );
}
