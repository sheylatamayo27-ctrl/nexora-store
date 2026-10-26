"use client";

import { ProductCard } from "@/components/commerce/ProductCard";
import { CarouselDots, useCarousel } from "@/components/ui/Carousel";
import type { Product } from "@/data/types";

/**
 * "Colección destacada".
 * Móvil/tablet (<lg): carrusel por páginas — de 2 en 2 en móvil y de 3 en 3 en
 * tablet — con puntos indicadores. Escritorio (≥lg): grilla de 5, intacta.
 */
export function FeaturedCarousel({ products }: { products: Product[] }) {
  // En SSR se asume móvil (2 por vista); el hook recalcula al montar.
  const { scrollerRef, active, count, goTo } = useCarousel(Math.ceil(products.length / 2));

  return (
    <div>
      <div
        ref={scrollerRef}
        aria-label="Colección destacada"
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 no-scrollbar md:gap-4 lg:grid lg:snap-none lg:grid-cols-5 lg:overflow-visible"
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            // Anclaje solo en la primera tarjeta de cada página (snap-always: un
            // deslizamiento = una página). En el carrusel la tarjeta no se levanta
            // al tocarla: todas quedan al mismo nivel.
            className="w-[calc((100%-0.75rem)/2)] shrink-0 snap-always max-md:odd:snap-start md:w-[calc((100%-2rem)/3)] md:[&:nth-child(3n+1)]:snap-start max-lg:hover:translate-y-0 max-lg:hover:border-border max-lg:hover:shadow-none lg:w-auto"
          />
        ))}
      </div>

      {/* -mt-2.5 deja ~16px visibles entre las tarjetas y los puntos. */}
      <CarouselDots
        count={count}
        active={active}
        onSelect={goTo}
        label={(i, n) => `Ir a la página ${i + 1} de ${n}`}
        className="-mt-2.5 lg:hidden"
      />
    </div>
  );
}
