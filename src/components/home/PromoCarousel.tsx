"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { Reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { PromoBanner } from "@/data/types";

/**
 * Banners promocionales ("Explorar más").
 * Móvil (<md): carrusel nativo con scroll-snap centrado + puntos indicadores.
 * Tablet/escritorio (≥md): grilla, idéntica a la versión anterior.
 */
export function PromoCarousel({ banners }: { banners: PromoBanner[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Banner activo = el que está mayormente visible dentro del carrusel.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const items = Array.from(scroller.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(items.indexOf(entry.target as HTMLElement));
        }
      },
      { root: scroller, threshold: 0.6 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const item = scrollerRef.current?.children[index] as HTMLElement | undefined;
    if (!item) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    item.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
  };

  return (
    <>
      <div
        ref={scrollerRef}
        aria-label="Explorar más"
        className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 no-scrollbar max-md:snap-mandatory max-md:overscroll-x-contain md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
      >
        {banners.map((b, i) => (
          <Reveal
            key={b.eyebrow}
            delay={i * 0.08}
            className={cn(
              "w-[85vw] shrink-0 snap-start max-md:snap-center md:w-auto",
              i === 2 && "md:col-span-2 lg:col-span-1"
            )}
          >
            <Link
              href={b.href}
              className="group relative flex h-80 flex-col overflow-hidden rounded-xl bg-brand-800 p-8"
            >
              <AssetImage
                folder="banners"
                name={b.image}
                alt={b.title}
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 ${
                  b.align === "center"
                    ? "bg-gradient-to-t from-[#081B4B]/90 via-[#081B4B]/30 to-transparent"
                    : "bg-gradient-to-r from-[#081B4B]/90 via-[#081B4B]/30 to-transparent"
                }`}
              />
              <div
                className={`relative mt-auto flex flex-col gap-1 ${
                  b.align === "center" ? "items-center text-center" : "items-start"
                }`}
              >
                <span className="text-label-xs uppercase tracking-widest text-accent-500">
                  {b.eyebrow}
                </span>
                <span className="max-w-[14rem] text-h3 text-text-inverse">{b.title}</span>
                <span className="text-body text-white/80">{b.subtitle}</span>
                <span className="mt-2 flex items-center gap-1.5 text-label text-text-inverse underline decoration-from-font underline-offset-4">
                  Comprar ahora <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Indicadores (solo móvil). El botón mide 44px para el toque; el punto, 8px.
          -mt-2.5 deja ~16px visibles entre los banners y los puntos. */}
      <div className="-mt-2.5 flex justify-center md:hidden">
        {banners.map((b, i) => (
          <button
            key={b.eyebrow}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir al banner ${i + 1} de ${banners.length}`}
            aria-current={i === active ? "true" : undefined}
            className="flex h-11 min-w-[44px] items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500/50 rounded-full"
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-all duration-300 ease-out motion-reduce:transition-none",
                i === active ? "w-6 bg-brand-800" : "w-2 bg-border-strong"
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
}
