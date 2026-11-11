"use client";

import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CarouselDots, useCarousel } from "@/components/ui/Carousel";
import { CarouselArrows } from "@/components/ui/CarouselArrows";
import type { Product } from "@/data/types";

export function FeaturedCarousel({ products }: { products: Product[] }) {
  const t = useTranslations("home");
  const tA11y = useTranslations("a11y");
  const { scrollerRef, active, count, goTo } = useCarousel(Math.ceil(products.length / 2));

  return (
    <div className="relative lg:[container-type:inline-size]">
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
            className="w-[calc((100%-0.75rem)/2)] shrink-0 snap-always max-md:odd:snap-start md:w-[calc((100%-2rem)/3)] md:max-lg:[&:nth-child(3n+1)]:snap-start max-lg:hover:translate-y-0 max-lg:hover:border-border max-lg:hover:shadow-none lg:w-[calc((100%-4rem)/5)] lg:[&:nth-child(5n+1)]:snap-start"
          />
        ))}
      </div>

      {count > 1 && (
        <CarouselArrows
          onPrev={() => goTo(active - 1)}
          onNext={() => goTo(active + 1)}
          canPrev={active > 0}
          canNext={active < count - 1}
          className="bottom-2"
        />
      )}

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
