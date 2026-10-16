import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  checked,
  onChange,
  label,
  count,
  className,
}: {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label: string;
  count?: string;
  className?: string;
}) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-3 select-none", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only"
      />
      <span
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-[5px] border transition-colors",
          checked ? "border-brand-800 bg-brand-800" : "border-border-strong bg-surface"
        )}
      >
        {checked && <Check className="h-3.5 w-3.5 text-text-inverse" />}
      </span>
      <span className="text-body text-text-primary">{label}</span>
      {count && <span className="text-body-sm text-text-muted">{count}</span>}
    </label>
  );
}
