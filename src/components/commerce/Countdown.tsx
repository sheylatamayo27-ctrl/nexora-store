"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/** Unidad: valor con dos dígitos y su clave de texto en "common.countdown". */
type Unit = { v: string; l: "days" | "hours" | "minutes" | "seconds" };

function split(ms: number): Unit[] {
  const clamp = Math.max(0, ms);
  const days = Math.floor(clamp / 86_400_000);
  const hours = Math.floor((clamp % 86_400_000) / 3_600_000);
  const mins = Math.floor((clamp % 3_600_000) / 60_000);
  const secs = Math.floor((clamp % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return [
    { v: pad(days), l: "days" },
    { v: pad(hours), l: "hours" },
    { v: pad(mins), l: "minutes" },
    { v: pad(secs), l: "seconds" },
  ];
}

/**
 * Contador regresivo en vivo con el estilo de "Oferta del día".
 * El plazo se fija al montar (cliente) para evitar desajustes de hidratación;
 * `endsInHours` define la duración restante. Reutilizable en home y /offers.
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
  const t = useTranslations("common.countdown");
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
      ? "h-10 w-10 text-[0.95rem] sm:h-12 sm:w-12 sm:text-[1.1rem]"
      : "h-11 w-11 text-[0.95rem] sm:h-14 sm:w-14 sm:text-[1.35rem]";

  return (
    <div
      className={cn("flex items-center gap-1.5 sm:gap-2", className)}
      role="timer"
      aria-live="off"
      suppressHydrationWarning
    >
      {units.map((u, i) => (
        <div key={u.l} className="flex items-center gap-1 sm:gap-2">
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
            <span className="text-body-sm text-white/70">{t(u.l)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
