import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  current = 1,
  total = 1,
  className,
}: {
  current?: number;
  total?: number;
  className?: string;
}) {
  const pages: (number | "…")[] =
    total <= 5
      ? Array.from({ length: total }, (_, i) => i + 1)
      : [1, 2, 3, "…", total];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-text-primary hover:bg-surface-subtle"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-[18px] w-[18px]" />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={i} className="flex h-10 w-10 items-center justify-center text-text-muted">
            …
          </span>
        ) : (
          <button
            key={i}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md text-label",
              p === current
                ? "bg-brand-800 text-text-inverse"
                : "border border-border bg-surface text-text-primary hover:bg-surface-subtle"
            )}
          >
            {p}
          </button>
        )
      )}
      <button
        className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-text-primary hover:bg-surface-subtle"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}
