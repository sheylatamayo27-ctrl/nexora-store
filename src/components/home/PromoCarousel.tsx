"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { CarouselDots, useCarousel } from "@/components/ui/Carousel";
import { Reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { PromoBanner } from "@/data/types";

/**
 * Banners promocionales ("Explorar más").
 * Móvil (<md): carrusel de un banner a todo el ancho por vista (como
 * "Colección destacada") + puntos indicadores.
 * Tablet/escritorio (≥md): grilla, idéntica a la versión anterior.
 */
export function PromoCarousel({ banners }: { banners: PromoBanner[] }) {
  const { scrollerRef, active, count, goTo } = useCarousel(banners.length);

  return (
    <>
      <div
        ref={scrollerRef}
        aria-label="Explorar más"
        className="flex snap-x gap-4 overflow-x-auto pb-2 no-scrollbar max-md:snap-mandatory max-md:overscroll-x-contain md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 lg:grid-cols-3"
      >
        {banners.map((b, i) => (
          // En móvil el Reveal (que se activa al entrar en vertical) dejaría ocultos
          // los banners que esperan a la derecha: se muestran siempre.
          <Reveal
            key={b.eyebrow}
            delay={i * 0.08}
            className={cn(
              "w-full shrink-0 snap-start snap-always max-md:!transform-none max-md:!opacity-100 md:w-auto",
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

      {/* Indicadores (solo móvil). -mt-2.5 deja ~16px visibles entre los banners y los puntos. */}
      <CarouselDots
        count={count}
        active={active}
        onSelect={goTo}
        label={(i, n) => `Ir al banner ${i + 1} de ${n}`}
        className="-mt-2.5 md:hidden"
      />
    </>
  );
}
