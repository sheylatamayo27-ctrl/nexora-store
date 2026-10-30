"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown, LayoutGrid, List, Check } from "lucide-react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ProductCardSkeletons } from "@/components/commerce/ProductCardSkeleton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Checkbox } from "@/components/ui/Checkbox";
import { Radio } from "@/components/ui/Radio";
import { OptionChip, FilterChip } from "@/components/ui/Chip";
import { Pagination } from "@/components/ui/Pagination";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ServiceFeatures } from "@/components/commerce/ServiceFeatures";
import type { Category } from "@/data/types";
import { formatPriceShort } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { productsKey, useProducts } from "@/hooks/useProducts";
import type { ProductFacets, ProductListQuery, ProductListResponse, ProductSort } from "@/server/api-types";
import { FilterSheet, type SheetFilters } from "@/components/category/FilterSheet";
import { SortMenu } from "@/components/category/SortMenu";
import {
  PAGE_SIZE,
  PRICE_MAX,
  PRICE_MIN,
  defaultFilters,
  toListQuery,
  type AvailId,
} from "@/components/category/query";

const ratings = [4, 3, 2];
const PRICE_STEP = 500;
/** Espera tras mover el slider de precio o tocar la hoja de filtros antes de pedir a la API. */
const DEBOUNCE_MS = 250;

const sortOptions: { id: ProductSort; label: string }[] = [
  { id: "popular", label: "Más populares" },
  { id: "price-asc", label: "Precio: menor a mayor" },
  { id: "price-desc", label: "Precio: mayor a menor" },
  { id: "rating", label: "Mejor valorados" },
];

const toSort = (id: string): ProductSort => sortOptions.find((o) => o.id === id)?.id ?? "popular";

const availabilityOptions = [
  { id: "inStock", label: "Solo en stock" },
  { id: "onSale", label: "En oferta" },
  { id: "freeDelivery", label: "Envío gratis" },
] as const;

/**
 * Listado de una categoría. Filtros, orden y páginas se piden a GET /api/products
 * (SWR); la primera página llega ya calculada del servidor (`initialData`) para que
 * el HTML inicial traiga los productos.
 */
export function CategoryView({
  title,
  description,
  categories,
  initialCategories = [],
  saleOnly = false,
  facets,
  initialData,
}: {
  title: string;
  description: string;
  /** Todas las categorías (nombres de los filtros, chips y la hoja de filtros). */
  categories: Category[];
  initialCategories?: string[];
  /** Vista de ofertas: el listado parte solo de los productos rebajados. */
  saleOnly?: boolean;
  /** Conteos de categorías, marcas y colores del conjunto base (del servidor). */
  facets: ProductFacets;
  /** Primera página con los filtros iniciales, calculada en el servidor (SEO, sin parpadeo). */
  initialData: ProductListResponse;
}) {
  const [initial] = useState(() => defaultFilters(initialCategories));
  const [cats, setCats] = useState<string[]>(initial.cats);
  const [price, setPrice] = useState<[number, number]>(initial.price);
  const [rating, setRating] = useState<number | null>(initial.rating);
  const [brands, setBrands] = useState<string[]>(initial.brands);
  const [colors, setColors] = useState<string[]>(initial.colors);
  const [avail, setAvail] = useState<Record<AvailId, boolean>>(initial.avail);
  const [sort, setSort] = useState<ProductSort>(initial.sort);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [sheetDraft, setSheetDraft] = useState<SheetFilters | null>(null);

  const { categories: counts, brands: brandList, colors: colorList } = facets;

  const priceChanged = price[0] !== PRICE_MIN || price[1] !== PRICE_MAX;

  // El slider de precio cambia en cada paso del arrastre: se pide al dejar de moverlo.
  const debouncedPrice = useDebouncedValue(price, DEBOUNCE_MS);
  const query = toListQuery({ cats, price: debouncedPrice, rating, brands, colors, avail, sort }, saleOnly);

  // Filtros u orden nuevos → página 1. Se ajusta en este mismo render (no en un
  // efecto) para no llegar a pedir las páginas 2..N de la consulta nueva.
  const filtersKey = JSON.stringify([cats, debouncedPrice, rating, brands, colors, avail, sort]);
  const [pageFilters, setPageFilters] = useState(filtersKey);
  if (pageFilters !== filtersKey) {
    setPageFilters(filtersKey);
    setPage(1);
  }

  const { items, total, totalPages, isLoading, error, mutate } = useProducts(query, {
    fallbackData: initialData,
  });
  const failed = Boolean(error) && !isLoading;

  const currentPage = Math.min(page, Math.max(1, totalPages));
  const shownTo = Math.min(currentPage * PAGE_SIZE, total);

  // Conteo de la hoja de filtros (borrador + valoración/color actuales): se pide a la
  // API con la misma forma que la grilla, así al aplicarlo ya está en caché.
  const debouncedDraft = useDebouncedValue(sheetDraft, DEBOUNCE_MS);
  const draftQuery =
    debouncedDraft &&
    toListQuery(
      {
        cats: debouncedDraft.cats,
        price: debouncedDraft.price,
        rating,
        brands: debouncedDraft.brands,
        colors,
        avail: { ...avail, ...debouncedDraft.avail },
        sort,
      },
      saleOnly
    );
  const draftIsApplied = !draftQuery || productsKey(draftQuery) === productsKey(query);
  const draftList = useProducts(draftIsApplied ? null : draftQuery);
  const sheetCount = draftIsApplied
    ? total
    : draftList.isLoading || draftList.error
      ? undefined
      : draftList.total;

  const applySheet = (next: SheetFilters) => {
    setCats(next.cats);
    setPrice(next.price);
    setBrands(next.brands);
    setAvail(next.avail as Record<AvailId, boolean>);
  };

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
    const cleared = defaultFilters();
    setCats(cleared.cats);
    setPrice(cleared.price);
    setRating(cleared.rating);
    setBrands(cleared.brands);
    setColors(cleared.colors);
    setAvail(cleared.avail);
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
          <Breadcrumb items={[{ label: "Tienda", href: "/category/headphones" }, { label: title }]} />
          <div className="flex flex-col gap-2">
            <h1 className="text-h2 text-text-primary sm:text-display-l">{title}</h1>
            {/* Escritorio: descripción (intacta). Móvil/tablet: conteo real · entrega. */}
            <p className="hidden max-w-2xl text-body-lg text-text-secondary lg:block">{description}</p>
            <p className="text-body text-text-secondary lg:hidden">
              {total} productos · Entrega al día siguiente
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <OptionChip
              selected={cats.length === 0}
              onClick={() => setCats([])}
              className="max-lg:shrink-0 max-lg:whitespace-nowrap"
            >
              Todo
            </OptionChip>
            {categories.slice(0, 7).map((c) => (
              <OptionChip
                key={c.slug}
                selected={cats.includes(c.slug)}
                onClick={() => toggleCat(c.slug)}
                className="max-lg:shrink-0 max-lg:whitespace-nowrap"
              >
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
          {/* Barra de herramientas (móvil <768): dos botones al 50% */}
          <div className="flex gap-3 md:hidden">
            <Button variant="primary" className="flex-1" onClick={() => setSheetOpen(true)}>
              <SlidersHorizontal className="h-[18px] w-[18px]" /> Filtros
              {activeCount > 0 && (
                <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-label-xs text-brand-900">
                  {activeCount}
                </span>
              )}
            </Button>
            <SortMenu value={sort} options={sortOptions} onChange={(id) => setSort(toSort(id))} className="flex-1" />
          </div>

          {/* Barra de herramientas (tablet + escritorio) — en escritorio es idéntica */}
          <div className="hidden flex-wrap items-center justify-between gap-3 md:flex">
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
                {total > 0 ? (
                  <>
                    Mostrando <span className="text-text-primary">1–{shownTo}</span> de {total}
                  </>
                ) : (
                  "Sin resultados"
                )}
              </span>
              <div className="hidden flex-wrap items-center gap-2 lg:flex">
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
                  onChange={(e) => setSort(toSort(e.target.value))}
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

          {/* Chips de filtros activos (móvil + tablet) — en escritorio van en la barra */}
          {(cats.length > 0 || brands.length > 0 || priceChanged) && (
            <div className="flex flex-wrap items-center gap-2 lg:hidden">
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
          )}

          {/* Grid */}
          {failed ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface py-20 text-center">
              <p className="text-h4 text-text-primary">No pudimos cargar los productos</p>
              <button onClick={() => mutate()} className="text-label text-brand-700">
                Reintentar
              </button>
            </div>
          ) : isLoading || total > 0 ? (
            <div
              aria-busy={isLoading || undefined}
              className={
                view === "grid"
                  ? "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
                  : "flex flex-col gap-4"
              }
            >
              {isLoading ? (
                <ProductCardSkeletons count={items.length || PAGE_SIZE} />
              ) : (
                items.map((p) => <ProductCard key={p.id} product={p} />)
              )}
              {/* Páginas 2..N ("Cargar más" / paginación): cada una es su propia petición. */}
              {Array.from({ length: currentPage - 1 }, (_, i) => (
                <ProductPage
                  key={i + 2}
                  query={query}
                  page={i + 2}
                  expected={Math.max(0, Math.min(PAGE_SIZE, total - (i + 1) * PAGE_SIZE))}
                />
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

          {!failed && total > 0 && (
            <div className="flex flex-col items-center gap-5 pt-4">
              {/* Móvil (<768): resumen + barra de progreso + "Cargar más" */}
              <div className="flex w-full flex-col items-center gap-3 md:hidden">
                <span className="text-body-sm text-text-secondary">
                  Mostrando {shownTo} de {total} productos
                </span>
                <div
                  className="h-1 w-40 overflow-hidden rounded-full bg-surface-muted"
                  role="progressbar"
                  aria-valuenow={shownTo}
                  aria-valuemin={0}
                  aria-valuemax={total}
                >
                  <div
                    className="h-full rounded-full bg-brand-800 transition-[width] duration-500"
                    style={{ width: `${(shownTo / total) * 100}%` }}
                  />
                </div>
                {shownTo < total && (
                  <Button variant="outline" fullWidth onClick={() => setPage((p) => p + 1)}>
                    Cargar más productos
                  </Button>
                )}
              </div>

              {/* Tablet (768–1023): paginación numérica + "Página X de Y" */}
              {totalPages > 1 && (
                <div className="hidden flex-col items-center gap-3 md:flex lg:hidden">
                  <Pagination current={currentPage} total={totalPages} onChange={setPage} />
                  <span className="text-body text-text-secondary">
                    Página {currentPage} de {totalPages}
                  </span>
                </div>
              )}

              {/* Escritorio (≥1024): idéntico al original */}
              {totalPages > 1 && (
                <div className="hidden w-full items-center justify-between gap-3 lg:flex">
                  <span className="block text-body text-text-secondary">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Pagination current={currentPage} total={totalPages} onChange={setPage} className="mx-0" />
                  {currentPage < totalPages ? (
                    <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
                      Cargar más productos
                    </Button>
                  ) : (
                    <span className="block w-[180px]" />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Container>

      {/* Beneficios (igual que en el home), encima del pie de página */}
      <ServiceFeatures />

      {/* Hoja de filtros (móvil/tablet) — M02b. El escritorio usa el sidebar. */}
      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        categories={categories
          .filter((c) => counts[c.slug])
          .map((c) => ({ slug: c.slug, name: c.name, count: counts[c.slug] }))}
        brands={brandList}
        priceMin={PRICE_MIN}
        priceMax={PRICE_MAX}
        priceStep={PRICE_STEP}
        priceFormat={formatPriceShort}
        availabilityOptions={availabilityOptions
          .filter((o) => o.id === "inStock" || o.id === "onSale")
          .map((o) => ({ id: o.id, label: o.label }))}
        initial={{ cats, price, brands, avail }}
        resultCount={sheetCount}
        onDraftChange={setSheetDraft}
        onApply={applySheet}
      />
    </div>
  );
}

/** Página 2 en adelante del listado: se pide al pulsar "Cargar más" o elegir una página. */
function ProductPage({ query, page, expected }: { query: ProductListQuery; page: number; expected: number }) {
  const { items, isLoading, error, mutate } = useProducts({ ...query, page });

  if (isLoading) return <ProductCardSkeletons count={expected} />;
  if (error) {
    return (
      <div className="col-span-full flex items-center justify-center gap-2 py-6 text-body text-text-secondary">
        No pudimos cargar más productos.
        <button onClick={() => mutate()} className="text-label text-brand-700">
          Reintentar
        </button>
      </div>
    );
  }
  return (
    <>
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </>
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
