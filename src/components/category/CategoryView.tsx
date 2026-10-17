"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown, LayoutGrid, List, X, Check } from "lucide-react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Checkbox } from "@/components/ui/Checkbox";
import { Radio } from "@/components/ui/Radio";
import { OptionChip, FilterChip } from "@/components/ui/Chip";
import { Pagination } from "@/components/ui/Pagination";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { categories } from "@/data/categories";
import { formatPriceShort } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/types";

const ratings = [4, 3, 2];
const PAGE_SIZE = 12;
const PRICE_MIN = 0;
const PRICE_MAX = 90000;
const PRICE_STEP = 500;

const sortOptions = [
  { id: "popular", label: "Más populares" },
  { id: "price-asc", label: "Precio: menor a mayor" },
  { id: "price-desc", label: "Precio: mayor a menor" },
  { id: "rating", label: "Mejor valorados" },
];

const availabilityOptions = [
  { id: "inStock", label: "Solo en stock" },
  { id: "onSale", label: "En oferta" },
  { id: "freeDelivery", label: "Envío gratis" },
] as const;

type AvailId = (typeof availabilityOptions)[number]["id"];

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
  const [price, setPrice] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [rating, setRating] = useState<number | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [avail, setAvail] = useState<Record<AvailId, boolean>>({
    inStock: true,
    onSale: false,
    freeDelivery: false,
  });
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) map[p.categorySlug] = (map[p.categorySlug] ?? 0) + 1;
    return map;
  }, [products]);

  const brandList = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) map[p.vendor] = (map[p.vendor] ?? 0) + 1;
    return Object.entries(map).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [products]);

  const colorList = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of products) for (const c of p.colors ?? []) if (!map.has(c.name)) map.set(c.name, c.hex);
    return [...map.entries()];
  }, [products]);

  const priceChanged = price[0] !== PRICE_MIN || price[1] !== PRICE_MAX;

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (cats.length && !cats.includes(p.categorySlug)) return false;
      if (p.price < price[0] || p.price > price[1]) return false;
      if (rating && p.rating < rating) return false;
      if (brands.length && !brands.includes(p.vendor)) return false;
      if (colors.length && !(p.colors ?? []).some((c) => colors.includes(c.name))) return false;
      if (avail.onSale && !(p.compareAt && p.compareAt > p.price)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
    return list;
  }, [products, cats, price, rating, brands, colors, avail, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(1, totalPages));
  const shownTo = Math.min(currentPage * PAGE_SIZE, filtered.length);
  const shown = filtered.slice(0, shownTo);

  useEffect(() => {
    setPage(1);
  }, [cats, price, rating, brands, colors, avail, sort]);

  const toggleCat = (slug: string) =>
    setCats((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]));
  const toggleBrand = (b: string) =>
    setBrands((v) => (v.includes(b) ? v.filter((x) => x !== b) : [...v, b]));
  const toggleColor = (name: string) =>
    setColors((v) => (v.includes(name) ? v.filter((x) => x !== name) : [...v, name]));

  const activeCount =
    cats.length +
    (priceChanged ? 1 : 0) +
    (rating ? 1 : 0) +
    brands.length +
    colors.length +
    (avail.onSale ? 1 : 0);

  const clearAll = () => {
    setCats([]);
    setPrice([PRICE_MIN, PRICE_MAX]);
    setRating(null);
    setBrands([]);
    setColors([]);
    setAvail({ inStock: true, onSale: false, freeDelivery: false });
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
        <RangeSlider
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={price}
          onChange={setPrice}
          format={formatPriceShort}
        />
      </section>

      <div className="h-px bg-border" />
      <section className="flex flex-col gap-3">
        <h3 className="text-label-lg text-text-primary">Marca</h3>
        {brandList.map(([brand, count]) => (
          <Checkbox
            key={brand}
            checked={brands.includes(brand)}
            onChange={() => toggleBrand(brand)}
            label={brand}
            count={`(${count})`}
          />
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

      <div className="h-px bg-border" />
      <section className="flex flex-col gap-3">
        <h3 className="text-label-lg text-text-primary">Color</h3>
        <div className="flex flex-wrap gap-2.5">
          {colorList.map(([name, hex]) => {
            const active = colors.includes(name);
            return (
              <button
                key={name}
                type="button"
                title={name}
                aria-label={name}
                aria-pressed={active}
                onClick={() => toggleColor(name)}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-black/10 transition-transform hover:scale-110",
                  active && "ring-2 ring-brand-800 ring-offset-2"
                )}
                style={{ backgroundColor: hex }}
              >
                {active && (
                  <Check className="h-3.5 w-3.5" style={{ color: isLight(hex) ? "#0F172A" : "#fff" }} />
                )}
              </button>
            );
          })}
        </div>
      </section>

      <div className="h-px bg-border" />
      <section className="flex flex-col gap-3">
        <h3 className="text-label-lg text-text-primary">Disponibilidad</h3>
        {availabilityOptions.map((o) => (
          <Checkbox
            key={o.id}
            checked={avail[o.id]}
            onChange={() => setAvail((a) => ({ ...a, [o.id]: !a[o.id] }))}
            label={o.label}
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
              <button onClick={clearAll} className="text-label-sm text-brand-700 hover:text-brand-800">
                Limpiar todo
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
              <Button variant="primary" className="lg:hidden" onClick={() => setSheetOpen(true)}>
                <SlidersHorizontal className="h-[18px] w-[18px]" /> Filtros
                {activeCount > 0 && (
                  <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-label-xs text-brand-900">
                    {activeCount}
                  </span>
                )}
              </Button>
              <span className="text-body text-text-secondary">
                {filtered.length > 0 ? (
                  <>
                    Mostrando <span className="text-text-primary">1–{shownTo}</span> de {filtered.length}
                  </>
                ) : (
                  "Sin resultados"
                )}
              </span>
              <div className="hidden flex-wrap items-center gap-2 sm:flex">
                {cats.map((slug) => (
                  <FilterChip key={slug} onRemove={() => toggleCat(slug)}>
                    {categories.find((c) => c.slug === slug)?.name}
                  </FilterChip>
                ))}
                {brands.map((b) => (
                  <FilterChip key={b} onRemove={() => toggleBrand(b)}>
                    {b}
                  </FilterChip>
                ))}
                {priceChanged && (
                  <FilterChip onRemove={() => setPrice([PRICE_MIN, PRICE_MAX])}>
                    Hasta {formatPriceShort(price[1])}
                  </FilterChip>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Ordenar por"
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
              <div className="hidden items-center gap-1 sm:flex">
                <button
                  onClick={() => setView("grid")}
                  aria-label="Cuadrícula"
                  className={`flex h-10 w-10 items-center justify-center rounded-md ${view === "grid" ? "bg-brand-800 text-white" : "border border-border-strong text-text-secondary"}`}
                >
                  <LayoutGrid className="h-[18px] w-[18px]" />
                </button>
                <button
                  onClick={() => setView("list")}
                  aria-label="Lista"
                  className={`flex h-10 w-10 items-center justify-center rounded-md ${view === "list" ? "bg-brand-800 text-white" : "border border-border-strong text-text-secondary"}`}
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
              {shown.map((p) => (
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

          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-5 pt-4">
              <div className="flex w-full items-center justify-between gap-3">
                <span className="hidden text-body text-text-secondary sm:block">
                  Página {currentPage} de {totalPages}
                </span>
                <Pagination
                  current={currentPage}
                  total={totalPages}
                  onChange={setPage}
                  className="mx-auto sm:mx-0"
                />
                {currentPage < totalPages ? (
                  <Button variant="outline" className="hidden sm:inline-flex" onClick={() => setPage((p) => p + 1)}>
                    Cargar más productos
                  </Button>
                ) : (
                  <span className="hidden w-[180px] sm:block" />
                )}
              </div>
              {currentPage < totalPages && (
                <Button variant="outline" fullWidth className="sm:hidden" onClick={() => setPage((p) => p + 1)}>
                  Cargar más productos
                </Button>
              )}
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

/** Heurística simple para elegir el color del check sobre un swatch. */
function isLight(hex: string): boolean {
  const h = hex.replace("#", "");
  if (h.length < 6) return true;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
