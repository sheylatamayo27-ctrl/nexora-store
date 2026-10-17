"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Unit = { v: string; l: string };

function split(ms: number): Unit[] {
  const clamp = Math.max(0, ms);
  const days = Math.floor(clamp / 86_400_000);
  const hours = Math.floor((clamp % 86_400_000) / 3_600_000);
  const mins = Math.floor((clamp % 3_600_000) / 60_000);
  const secs = Math.floor((clamp % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return [
    { v: pad(days), l: "Días" },
    { v: pad(hours), l: "Hs" },
    { v: pad(mins), l: "Min" },
    { v: pad(secs), l: "Seg" },
  ];
}

/**
 * Contador regresivo en vivo con el estilo de "Oferta del día".
 * El plazo se fija al montar (cliente) para evitar desajustes de hidratación;
 * `endsInHours` define la duración restante. Reutilizable en home y /ofertas.
 */
export function Countdown({
  endsInHours = 72,
  size = "md",
  tone = "light",
  className,
}: {
  endsInHours?: number;
  size?: "sm" | "md";
  /** "dark" ajusta el separador para fondos oscuros (p. ej. el hero de ofertas). */
  tone?: "light" | "dark";
  className?: string;
}) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const deadline = Date.now() + endsInHours * 3_600_000;
    const tick = () => setRemaining(deadline - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsInHours]);

  const units = remaining === null ? split(endsInHours * 3_600_000) : split(remaining);
  const box =
    size === "sm"
      ? "h-12 w-12 text-[1.1rem]"
      : "h-14 w-14 text-[1.35rem]";

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="timer"
      aria-live="off"
      suppressHydrationWarning
    >
      {units.map((u, i) => (
        <div key={u.l} className="flex items-center gap-2">
          {i > 0 && (
            <span className={cn("text-h3", tone === "dark" ? "text-white/60" : "text-brand-800")}>:</span>
          )}
          <div
            className={cn(
              "flex flex-col items-center justify-center rounded-md bg-brand-900 text-white",
              box
            )}
          >
            <span className="font-semibold leading-none" suppressHydrationWarning>
              {u.v}
            </span>
            <span className="text-body-sm text-white/70">{u.l}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
