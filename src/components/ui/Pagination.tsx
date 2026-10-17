"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function buildPages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  const window = [current - 1, current, current + 1].filter((p) => p > 1 && p < total);
  if (window.length && window[0] > 2) pages.push("…");
  pages.push(...window);
  if (window.length && window[window.length - 1] < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

/**
 * Paginación controlada. No se renderiza si solo hay una página.
 * El consumidor mantiene el estado y recibe la página elegida en `onChange`.
 */
export function Pagination({
  current = 1,
  total = 1,
  onChange,
  className,
}: {
  current?: number;
  total?: number;
  onChange?: (page: number) => void;
  className?: string;
}) {
  if (total <= 1) return null;

  const pages = buildPages(current, total);
  const go = (p: number) => {
    if (p >= 1 && p <= total && p !== current) onChange?.(p);
  };

  const edgeBtn =
    "flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-text-primary transition-colors hover:bg-surface-subtle disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40";

  return (
    <nav className={cn("flex items-center gap-2", className)} aria-label="Paginación">
      <button className={edgeBtn} aria-label="Página anterior" onClick={() => go(current - 1)} disabled={current === 1}>
        <ChevronLeft className="h-[18px] w-[18px]" />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="flex h-10 w-10 items-center justify-center text-text-muted">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => go(p)}
            aria-current={p === current ? "page" : undefined}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md text-label transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
              p === current
                ? "bg-brand-800 text-white"
                : "border border-border bg-surface text-text-primary hover:bg-surface-subtle"
            )}
          >
            {p}
          </button>
        )
      )}
      <button className={edgeBtn} aria-label="Página siguiente" onClick={() => go(current + 1)} disabled={current === total}>
        <ChevronRight className="h-[18px] w-[18px]" />
      </button>
    </nav>
  );
}
