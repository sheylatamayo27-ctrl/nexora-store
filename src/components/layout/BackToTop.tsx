"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SHOW_AFTER = 400; // px de scroll antes de mostrarse
const DURATION = 550; // ms

/** Curva cubic-bezier(x1, y1, x2, y2) como función de progreso (0–1). */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  return (x: number) => {
    // Bisección: busca el t cuya x coincide con el progreso temporal.
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 24; i++) {
      const diff = sampleX(t) - x;
      if (Math.abs(diff) < 1e-5) break;
      if (diff < 0) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return sampleY(t);
  };
}

// Lenta al principio y rápida al final.
const easeIn = cubicBezier(0.55, 0, 1, 0.45);

/**
 * Botón flotante "Volver arriba" (móvil/tablet). Se coloca en `--fab-bottom`
 * (ver globals.css), que lo sube por encima de las barras fijas de compra/pago.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const scrollToTop = () => {
    const root = document.documentElement;
    const start = window.scrollY;
    // El scroll suave global (html { scroll-behavior: smooth }) suavizaría cada paso.
    root.style.scrollBehavior = "auto";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
      root.style.scrollBehavior = "";
      return;
    }

    // Si la persona vuelve a desplazarse, se cancela la animación.
    const stop = () => {
      cancelAnimationFrame(frame.current);
      root.style.scrollBehavior = "";
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });

    const t0 = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - t0) / DURATION);
      window.scrollTo(0, start * (1 - easeIn(progress)));
      if (progress < 1) frame.current = requestAnimationFrame(step);
      else stop();
    };
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(step);
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba"
      data-back-to-top
      data-visible={visible}
      className={cn(
        "fixed bottom-[var(--fab-bottom)] right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-brand-800 shadow-elevation-lg transition-[opacity,transform,visibility] duration-300 ease-out hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 motion-reduce:transition-none lg:hidden",
        visible ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
