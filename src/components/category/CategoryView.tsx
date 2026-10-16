"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown, LayoutGrid, List, X } from "lucide-react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Checkbox } from "@/components/ui/Checkbox";
import { Radio } from "@/components/ui/Radio";
import { OptionChip, FilterChip } from "@/components/ui/Chip";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { categories } from "@/data/categories";
import type { Product } from "@/data/types";

const priceRanges = [
  { id: "all", label: "Todos los precios", test: () => true },
  { id: "lt5", label: "Menos de Rs. 5,000", test: (p: Product) => p.price < 5000 },
  { id: "5-25", label: "Rs. 5,000 – 25,000", test: (p: Product) => p.price >= 5000 && p.price <= 25000 },
  { id: "gt25", label: "Más de Rs. 25,000", test: (p: Product) => p.price > 25000 },
];

const ratings = [4, 3, 2];

const sortOptions = [
  { id: "popular", label: "Más populares" },
  { id: "price-asc", label: "Precio: menor a mayor" },
  { id: "price-desc", label: "Precio: mayor a menor" },
  { id: "rating", label: "Mejor valorados" },
];

export function CategoryView({
  title,
  description,
  products,
  initialCategories = [],
}: {
  title: string;
  description: string;
  products: Product[];
  initialCategories?: string[];
}) {
  const [cats, setCats] = useState<string[]>(initialCategories);
  const [price, setPrice] = useState("all");
  const [rating, setRating] = useState<number | null>(null);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sheetOpen, setSheetOpen] = useState(false);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) map[p.categorySlug] = (map[p.categorySlug] ?? 0) + 1;
    return map;
  }, [products]);

  const filtered = useMemo(() => {
    const range = priceRanges.find((r) => r.id === price)!;
    let list = products.filter((p) => {
      if (cats.length && !cats.includes(p.categorySlug)) return false;
      if (!range.test(p)) return false;
      if (rating && p.rating < rating) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
    return list;
  }, [products, cats, price, rating, sort]);

  const toggleCat = (slug: string) =>
    setCats((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]));

  const activeCount = cats.length + (price !== "all" ? 1 : 0) + (rating ? 1 : 0);

  const clearAll = () => {
    setCats([]);
    setPrice("all");
    setRating(null);
  };

  const Facets = (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-3">
        <h3 className="text-label-lg text-text-primary">Categoría</h3>
        {categories
          .filter((c) => counts[c.slug])
          .map((c) => (
            <Checkbox
              key={c.slug}
              checked={cats.includes(c.slug)}
              onChange={() => toggleCat(c.slug)}
              label={c.name}
              count={`(${counts[c.slug]})`}
            />
          ))}
      </section>
      <div className="h-px bg-border" />
      <section className="flex flex-col gap-3">
        <h3 className="text-label-lg text-text-primary">Precio</h3>
        {priceRanges.map((r) => (
          <Radio key={r.id} selected={price === r.id} onChange={() => setPrice(r.id)} label={r.label} />
        ))}
      </section>
      <div className="h-px bg-border" />
      <section className="flex flex-col gap-3">
        <h3 className="text-label-lg text-text-primary">Valoración</h3>
        {ratings.map((r) => (
          <Radio
            key={r}
            selected={rating === r}
            onChange={() => setRating(rating === r ? null : r)}
            label={`${r}★ o más`}
          />
        ))}
      </section>
    </div>
  );

  return (
    <div className="flex flex-col">
      {/* Encabezado de categoría */}
      <div className="bg-surface">
        <Container className="flex flex-col gap-5 py-8">
          <Breadcrumb items={[{ label: "Tienda", href: "/categoria/auriculares" }, { label: title }]} />
          <div className="flex flex-col gap-2">
            <h1 className="text-h2 text-text-primary sm:text-display-l">{title}</h1>
            <p className="max-w-2xl text-body-lg text-text-secondary">{description}</p>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <OptionChip selected={cats.length === 0} onClick={() => setCats([])}>
              Todo
            </OptionChip>
            {categories.slice(0, 7).map((c) => (
              <OptionChip key={c.slug} selected={cats.includes(c.slug)} onClick={() => toggleCat(c.slug)}>
                {c.name}
              </OptionChip>
            ))}
          </div>
        </Container>
      </div>

      <Container className="flex gap-8 py-8">
        {/* Sidebar (escritorio) */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-28 rounded-xl border border-border bg-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2 text-h4 text-text-primary">
                <SlidersHorizontal className="h-[18px] w-[18px]" /> Filtros
              </span>
              <button onClick={clearAll} className="text-label-sm text-brand-700">
                Limpiar
              </button>
            </div>
            {Facets}
          </div>
        </aside>

        {/* Resultados */}
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                className="lg:hidden"
                onClick={() => setSheetOpen(true)}
              >
                <SlidersHorizontal className="h-[18px] w-[18px]" /> Filtros
                {activeCount > 0 && (
                  <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-label-xs text-brand-900">
                    {activeCount}
                  </span>
                )}
              </Button>
              <span className="text-body text-text-secondary">
                {filtered.length} producto{filtered.length !== 1 && "s"}
              </span>
              <div className="hidden items-center gap-2 sm:flex">
                {cats.map((slug) => (
                  <FilterChip key={slug} onRemove={() => toggleCat(slug)}>
                    {categories.find((c) => c.slug === slug)?.name}
                  </FilterChip>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-10 appearance-none rounded-md border border-border-strong bg-surface pl-4 pr-9 text-label-sm text-text-primary focus:outline-none"
                >
                  {sortOptions.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              </div>
              <div className="hidden items-center gap-1 sm:flex">
                <button
                  onClick={() => setView("grid")}
                  aria-label="Cuadrícula"
                  className={`flex h-10 w-10 items-center justify-center rounded-md ${view === "grid" ? "bg-brand-800 text-text-inverse" : "border border-border-strong text-text-secondary"}`}
                >
                  <LayoutGrid className="h-[18px] w-[18px]" />
                </button>
                <button
                  onClick={() => setView("list")}
                  aria-label="Lista"
                  className={`flex h-10 w-10 items-center justify-center rounded-md ${view === "list" ? "bg-brand-800 text-text-inverse" : "border border-border-strong text-text-secondary"}`}
                >
                  <List className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                  : "flex flex-col gap-4"
              }
            >
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface py-20 text-center">
              <p className="text-h4 text-text-primary">No hay productos con estos filtros</p>
              <button onClick={clearAll} className="text-label text-brand-700">
                Limpiar filtros
              </button>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="flex items-center justify-between pt-4">
              <span className="hidden text-body text-text-secondary sm:block">Página 1 de 1</span>
              <Pagination current={1} total={1} />
            </div>
          )}
        </div>
      </Container>

      {/* Hoja de filtros (móvil) */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-brand-900/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-2xl bg-surface lg:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
            >
              <div className="flex items-center justify-between border-b border-border p-4">
                <span className="text-h4 text-text-primary">Filtros</span>
                <button onClick={() => setSheetOpen(false)} aria-label="Cerrar">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">{Facets}</div>
              <div className="flex gap-3 border-t border-border p-4">
                <Button variant="outline" fullWidth onClick={clearAll}>
                  Limpiar
                </Button>
                <Button variant="primary" fullWidth onClick={() => setSheetOpen(false)}>
                  Ver {filtered.length} resultados
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
