"use client";

import { ProductCard } from "@/components/commerce/ProductCard";
import { CarouselDots, useCarousel } from "@/components/ui/Carousel";
import type { Product } from "@/data/types";

/**
 * "Colección destacada".
 * Móvil/tablet (<lg): carrusel con scroll-snap — 2 tarjetas por vista en móvil,
 * 3 en tablet — y puntos indicadores. Escritorio (≥lg): grilla de 5, intacta.
 */
export function FeaturedCarousel({ products }: { products: Product[] }) {
  // En SSR se asume móvil (2 por vista); el hook recalcula al montar.
  const { scrollerRef, active, count, goTo } = useCarousel(products.length - 1);

  return (
    <div>
      {/* max-lg:pt-1 deja sitio a la tarjeta, que sube 4px al pasar el cursor. */}
      <div
        ref={scrollerRef}
        aria-label="Colección destacada"
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 no-scrollbar max-lg:pt-1 md:gap-4 lg:grid lg:snap-none lg:grid-cols-5 lg:overflow-visible"
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            className="w-[calc((100%-0.75rem)/2)] shrink-0 snap-start md:w-[calc((100%-2rem)/3)] lg:w-auto"
          />
        ))}
      </div>

      {/* -mt-2.5 deja ~16px visibles entre las tarjetas y los puntos. */}
      <CarouselDots
        count={count}
        active={active}
        onSelect={goTo}
        label={(i, n) => `Ir a la posición ${i + 1} de ${n}`}
        className="-mt-2.5 lg:hidden"
      />
    </div>
  );
}
