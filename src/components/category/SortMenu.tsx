"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Selector de orden personalizado para móvil. A diferencia de un <select>
 * nativo (cuyo desplegable coloca el navegador y puede salirse de la pantalla),
 * este menú se ancla a la derecha y limita su ancho al viewport, así nunca
 * desborda. Solo se usa en la barra móvil; tablet/escritorio siguen con <select>.
 */
export function SortMenu({
  value,
  options,
  onChange,
  className,
}: {
  value: string;
  options: { id: string; label: string }[];
  onChange: (id: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.id === value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Ordenar por"
        className="flex h-11 w-full items-center justify-between gap-2 rounded-md border border-border-strong bg-surface pl-4 pr-3 text-label-sm text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
      >
        <span className="truncate">{current?.label}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-text-secondary transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-20 mt-2 w-max min-w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-md border border-border bg-surface py-1 shadow-elevation-md"
        >
          {options.map((o) => {
            const active = o.id === value;
            return (
              <li key={o.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(o.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 whitespace-nowrap px-4 py-2.5 text-left text-label-sm transition-colors",
                    active ? "bg-brand-100 text-brand-800" : "text-text-primary hover:bg-surface-subtle"
                  )}
                >
                  {o.label}
                  {active && <Check className="h-4 w-4 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
