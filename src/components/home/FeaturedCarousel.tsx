"use client";

import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CarouselDots, useCarousel } from "@/components/ui/Carousel";
import { CarouselArrows } from "@/components/ui/CarouselArrows";
import type { Product } from "@/data/types";

/**
 * "Colección destacada": carrusel por páginas en todos los anchos — de 2 en 2
 * en móvil, de 3 en 3 en tablet (con puntos indicadores) y de 5 en 5 en
 * escritorio (con flechas, si hay más de una página).
 */
export function FeaturedCarousel({ products }: { products: Product[] }) {
  const t = useTranslations("home");
  const tA11y = useTranslations("a11y");
  // En SSR se asume móvil (2 por vista); el hook recalcula al montar.
  const { scrollerRef, active, count, goTo } = useCarousel(Math.ceil(products.length / 2));

  return (
    // container-type (escritorio): las flechas miden su franja en `cqw`, el ancho del carrusel.
    <div className="relative lg:[container-type:inline-size]">
      {/* Escritorio: el scroll recorta lo que sobresale, así que el carrusel se
          ensancha por los lados (margen negativo + padding) para que la tarjeta pueda
          levantarse con su sombra al pasar el cursor; scroll-px alinea cada página
          con el borde del contenido. La franja lateral es más estrecha que el hueco entre
          tarjetas (14px de 16px), así que no asoma la tarjeta vecina. */}
      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription={tA11y("carousel")}
        aria-label={t("featuredTitle")}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 no-scrollbar md:gap-4 lg:-mx-3.5 lg:-my-4 lg:scroll-px-3.5 lg:px-3.5 lg:pb-6 lg:pt-4"
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            // Anclaje solo en la primera tarjeta de cada página (snap-always: un
            // deslizamiento = una página). En el carrusel la tarjeta no se levanta
            // al tocarla: todas quedan al mismo nivel.
            className="w-[calc((100%-0.75rem)/2)] shrink-0 snap-always max-md:odd:snap-start md:w-[calc((100%-2rem)/3)] md:max-lg:[&:nth-child(3n+1)]:snap-start max-lg:hover:translate-y-0 max-lg:hover:border-border max-lg:hover:shadow-none lg:w-[calc((100%-4rem)/5)] lg:[&:nth-child(5n+1)]:snap-start"
          />
        ))}
      </div>

      {/* Flechas centradas en el alto de la tarjeta: la franja es todo el carrusel
          menos los 8px que el scroller deja de más bajo las tarjetas (pt-4 + pb-6 − 2×my-4). */}
      {count > 1 && (
        <CarouselArrows
          onPrev={() => goTo(active - 1)}
          onNext={() => goTo(active + 1)}
          canPrev={active > 0}
          canNext={active < count - 1}
          className="bottom-2"
        />
      )}

      {/* -mt-2.5 deja ~16px visibles entre las tarjetas y los puntos. */}
      <CarouselDots
        count={count}
        active={active}
        onSelect={goTo}
        label={(i, n) => t("goToPage", { page: i + 1, total: n })}
        className="-mt-2.5 lg:hidden"
      />
    </div>
  );
}
