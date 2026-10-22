"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Flame, Zap, Tag, ChevronDown, TrendingDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Countdown } from "@/components/commerce/Countdown";
import { StockBar } from "@/components/commerce/StockBar";
import { Price } from "@/components/commerce/Price";
import { AssetImage } from "@/components/media/AssetImage";
import { Reveal } from "@/lib/motion";
import { discountPercent } from "@/lib/format";
import type { Product } from "@/data/types";

const sortOptions = [
  { id: "discount", label: "Mayor descuento" },
  { id: "price-asc", label: "Precio: menor a mayor" },
  { id: "price-desc", label: "Precio: mayor a menor" },
  { id: "rating", label: "Mejor valorados" },
];

export function OffersView({
  products,
  flashDeals,
}: {
  products: Product[];
  flashDeals: Product[];
}) {
  const [sort, setSort] = useState("discount");

  const sorted = useMemo(() => {
    const list = [...products];
    list.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return (discountPercent(b.price, b.compareAt) ?? 0) - (discountPercent(a.price, a.compareAt) ?? 0);
    });
    return list;
  }, [products, sort]);

  const maxDiscount = useMemo(
    () => products.reduce((max, p) => Math.max(max, discountPercent(p.price, p.compareAt) ?? 0), 0),
    [products]
  );

  return (
    <div className="flex flex-col">
      {/* Hero de ofertas */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-500">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-sale-500/20 blur-3xl" />
        <Container className="relative flex flex-col gap-6 py-12 text-white sm:py-16">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20">
            <Flame className="h-3.5 w-3.5 text-accent-500" />
            <span className="text-label-xs tracking-wide text-accent-500">OFERTAS POR TIEMPO LIMITADO</span>
          </span>

          <div className="flex flex-col gap-3">
            <h1 className="text-balance text-[2.25rem] font-semibold leading-[1.1] tracking-tight sm:text-display-l">
              Ofertas Nexora
            </h1>
            <p className="max-w-xl text-body-lg text-white/80">
              Los mejores descuentos en tecnología, seleccionados y por tiempo limitado.
              Apúrate antes de que se agoten.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-label-sm text-white/70">Termina en</span>
              <Countdown endsInHours={47} tone="dark" />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-h2 text-white">{products.length}</span>
                <span className="text-body-sm text-white/70">ofertas activas</span>
              </div>
              <span className="h-10 w-px bg-white/20" />
              <div className="flex flex-col">
                <span className="flex items-center gap-1 text-h2 text-accent-500">
                  <TrendingDown className="h-6 w-6" />−{maxDiscount}%
                </span>
                <span className="text-body-sm text-white/70">hasta de descuento</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Ofertas relámpago (con barra de stock) */}
      {flashDeals.length > 0 && (
        <section className="py-12 sm:py-16">
          <Container className="flex flex-col gap-6">
            <Reveal>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent-600" />
                <h2 className="text-h3 text-text-primary sm:text-h2">Ofertas relámpago</h2>
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {flashDeals.map((p) => {
                const pct = discountPercent(p.price, p.compareAt);
                return (
                  <Link
                    key={p.id}
                    href={`/producto/${p.slug}`}
                    className="group flex gap-4 rounded-lg border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-elevation-md"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-surface-subtle">
                      <AssetImage folder="products" name={p.image} alt={p.name} sizes="96px" />
                      {pct && (
                        <span className="absolute left-1 top-1 rounded-sm bg-sale-500 px-1.5 py-0.5 text-label-xs text-white">
                          −{pct}%
                        </span>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-label-sm uppercase tracking-wide text-text-muted">{p.vendor}</span>
                      <span className="line-clamp-2 text-label text-text-primary">{p.name}</span>
                      <Price price={p.price} compareAt={p.compareAt} size="sm" className="mt-0.5" />
                      {p.sold && <StockBar current={p.sold.current} total={p.sold.total} className="mt-auto pt-2" />}
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Todas las ofertas */}
      <section className="border-t border-border bg-surface py-12 sm:py-16">
        <Container className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-brand-700" />
              <h2 className="text-h3 text-text-primary sm:text-h2">Todas las ofertas</h2>
              <span className="text-body text-text-secondary">
                ({products.length} producto{products.length !== 1 && "s"})
              </span>
            </div>
            <div className="relative">
              <label htmlFor="offers-sort" className="sr-only">
                Ordenar ofertas
              </label>
              <select
                id="offers-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 appearance-none rounded-md border border-border-strong bg-surface pl-4 pr-9 text-label-sm text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {sorted.map((p) => (
              <ProductCard key={p.id} product={p} showColors={false} showDiscountPercent />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
