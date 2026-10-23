"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { promoBanners } from "@/data/categories";
import { cn } from "@/lib/utils";

/**
 * Banners de "Explorar más". En móvil es un carrusel deslizable con puntos
 * (una tarjeta por vista); desde tablet (md) pasa a cuadrícula 2 + 1 a lo ancho,
 * igual que el diseño.
 */
export function PromoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0"
      >
        {promoBanners.map((b, i) => (
          <Link
            key={b.eyebrow}
            href={b.href}
            className={cn(
              "group relative flex h-72 w-full shrink-0 snap-center flex-col overflow-hidden rounded-xl bg-brand-800 p-8 sm:h-80 md:w-auto",
              i === 2 && "md:col-span-2"
            )}
          >
            <AssetImage
              folder="banners"
              name={b.image}
              alt={b.title}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className={cn(
                "absolute inset-0",
                b.align === "center"
                  ? "bg-gradient-to-t from-[#081B4B]/90 via-[#081B4B]/30 to-transparent"
                  : "bg-gradient-to-r from-[#081B4B]/90 via-[#081B4B]/30 to-transparent"
              )}
            />
            <div
              className={cn(
                "relative mt-auto flex flex-col gap-1",
                b.align === "center" ? "items-center text-center" : "items-start"
              )}
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
        ))}
      </div>

      {/* Puntos del carrusel (solo móvil) */}
      <div className="flex items-center justify-center gap-2 md:hidden">
        {promoBanners.map((b, i) => (
          <button
            key={b.eyebrow}
            type="button"
            aria-label={`Ir al banner ${i + 1}`}
            onClick={() => goTo(i)}
            className="h-2 rounded-full bg-brand-800 transition-all"
            style={{ width: i === active ? 24 : 8, opacity: i === active ? 1 : 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
