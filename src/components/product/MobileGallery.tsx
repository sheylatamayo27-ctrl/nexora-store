"use client";

import { useRef, useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { BadgeType } from "@/data/types";

/**
 * Galería deslizable para móvil/tablet (M03/T03): carrusel con scroll-snap,
 * contador "n / total", botones de favorito/compartir y miniaturas sincronizadas.
 * Solo se monta <lg; el escritorio usa su galería de miniaturas en columna.
 */
export function MobileGallery({
  images,
  alt,
  badge,
  wished,
  onWish,
}: {
  images: string[];
  alt: string;
  badge?: { type: BadgeType; label: string };
  wished: boolean;
  onWish: () => void;
}) {
  const [index, setIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setIndex(i);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="no-scrollbar flex aspect-square snap-x snap-mandatory overflow-x-auto rounded-2xl bg-surface-subtle"
        >
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square w-full shrink-0 snap-center">
              <AssetImage folder="products" name={img} alt={alt} priority={i === 0} sizes="100vw" />
            </div>
          ))}
        </div>

        {badge && (
          <Badge type={badge.type} className="absolute left-4 top-4">
            {badge.label}
          </Badge>
        )}

        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={onWish}
            aria-label={wished ? "Quitar de favoritos" : "Guardar en favoritos"}
            aria-pressed={wished}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-elevation-sm transition-transform active:scale-95"
          >
            <Heart
              className={cn(
                "h-[18px] w-[18px] transition-colors",
                wished ? "fill-sale-500 text-sale-500" : "text-text-primary"
              )}
            />
          </button>
          <button
            type="button"
            aria-label="Compartir"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-elevation-sm transition-transform active:scale-95"
          >
            <Share2 className="h-[18px] w-[18px] text-text-primary" />
          </button>
        </div>

        <span className="absolute bottom-4 right-4 rounded-full bg-brand-900/70 px-3 py-1 text-label-xs text-white">
          {index + 1} / {images.length}
        </span>
      </div>

      {/* Miniaturas (fila con scroll) */}
      <div className="no-scrollbar flex gap-3 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ver imagen ${i + 1}`}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-subtle sm:h-20 sm:w-20",
              i === index ? "ring-2 ring-brand-800" : "ring-1 ring-border"
            )}
          >
            <AssetImage folder="products" name={img} alt={alt} sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
