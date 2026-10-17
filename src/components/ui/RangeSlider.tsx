"use client";

import { cn } from "@/lib/utils";

/**
 * Slider de rango doble (mínimo y máximo) con track relleno.
 * Dos inputs range superpuestos; el truco de pointer-events (ver globals.css)
 * evita que un thumb bloquee al otro.
 */
export function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  format = (n) => String(n),
  className,
}: {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  format?: (n: number) => string;
  className?: string;
}) {
  const [lo, hi] = value;
  const pct = (n: number) => ((n - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative h-5">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-surface-muted" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-800"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi - step), hi])}
          className="range-thumb absolute inset-0 w-full"
          aria-label="Precio mínimo"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo + step)])}
          className="range-thumb absolute inset-0 w-full"
          aria-label="Precio máximo"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="flex-1 rounded-md border border-border bg-surface px-2.5 py-1.5 text-center text-label-sm text-text-primary">
          {format(lo)}
        </span>
        <span className="text-text-muted">—</span>
        <span className="flex-1 rounded-md border border-border bg-surface px-2.5 py-1.5 text-center text-label-sm text-text-primary">
          {format(hi)}
        </span>
      </div>
    </div>
  );
}
