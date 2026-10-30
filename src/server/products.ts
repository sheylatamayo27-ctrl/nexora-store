import type { Product } from "@/data/types";
import type { ProductFacets, ProductListQuery, ProductListResponse, ProductSort } from "./api-types";
import { products } from "./db/products.data";
import { searchProducts } from "./search";

/*
 * Acceso a productos. Hoy lee del catálogo local (`./db`); el día del backend
 * real, cada función cambia su cuerpo por el fetch indicado (con `apiBase` de
 * `./config`) y quien la llama no se entera.
 */

/** Todo el catálogo. */
export async function getProducts(): Promise<Product[]> {
  // Backend real: fetch(apiBase + "/products")
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  // Backend real: fetch(apiBase + "/products/" + slug) — un 404 devuelve undefined.
  return products.find((p) => p.slug === slug);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  // Backend real: fetch(apiBase + "/products?category=" + categorySlug)
  return products.filter((p) => p.categorySlug === categorySlug);
}

/** Productos destacados para la home. */
export async function getFeaturedProducts(): Promise<Product[]> {
  // Backend real: fetch(apiBase + "/products?featured=true")
  return products.slice(0, 6);
}

/** Ofertas del día: los productos con barra de progreso de stock. */
export async function getDealProducts(): Promise<Product[]> {
  // Backend real: fetch(apiBase + "/products?deals=true")
  return products.filter((p) => p.sold);
}

/** Todos los productos en descuento (tienen precio de comparación). */
export async function getSaleProducts(): Promise<Product[]> {
  // Backend real: fetch(apiBase + "/products?onSale=true")
  return products.filter((p) => p.compareAt && p.compareAt > p.price);
}

/** Valores por defecto y tope del listado paginado. */
export const PRODUCT_LIST_DEFAULTS = { page: 1, pageSize: 12, maxPageSize: 50 } as const;

/** `relevance` conserva el orden de llegada: el del catálogo, o el ranking de la búsqueda si hay `q`. */
const sorters: Record<ProductSort, ((a: Product, b: Product) => number) | undefined> = {
  relevance: undefined,
  popular: (a, b) => b.reviews - a.reviews,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
};

export const PRODUCT_SORTS = Object.keys(sorters) as ProductSort[];

/** Productos que cumplen la búsqueda y los filtros, ya ordenados (sin paginar). */
async function filterProducts(query: ProductListQuery): Promise<Product[]> {
  const { q, category, brand, color, minPrice, maxPrice, minRating, sale, deal, featured } = query;

  let items = q ? await searchProducts(q) : await getProducts();

  // Cada filtro activo se cruza con su selector, conservando el orden actual.
  const subsets = await Promise.all([
    category?.length ? Promise.all(category.map(getProductsByCategory)).then((lists) => lists.flat()) : undefined,
    sale ? getSaleProducts() : undefined,
    deal ? getDealProducts() : undefined,
    featured ? getFeaturedProducts() : undefined,
  ]);
  for (const subset of subsets) {
    if (!subset) continue;
    const ids = new Set(subset.map((p) => p.id));
    items = items.filter((p) => ids.has(p.id));
  }

  // Filtros sobre atributos del propio producto.
  items = items.filter(
    (p) =>
      (!brand?.length || brand.includes(p.vendor)) &&
      (!color?.length || (p.colors ?? []).some((c) => color.includes(c.name))) &&
      (minPrice === undefined || p.price >= minPrice) &&
      (maxPrice === undefined || p.price <= maxPrice) &&
      (minRating === undefined || p.rating >= minRating)
  );

  const compare = sorters[query.sort ?? "relevance"];
  return compare ? [...items].sort(compare) : items;
}

/** Listado paginado con búsqueda, filtros y orden (lo que sirve GET /api/products). */
export async function listProducts(query: ProductListQuery = {}): Promise<ProductListResponse> {
  // Backend real: fetch(apiBase + "/products?" + new URLSearchParams(query))
  const page = query.page ?? PRODUCT_LIST_DEFAULTS.page;
  const pageSize = query.pageSize ?? PRODUCT_LIST_DEFAULTS.pageSize;

  const items = await filterProducts(query);
  const total = items.length;
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

/** Facetas (categorías, marcas y colores con sus conteos) del conjunto que describe `query`. */
export async function getProductFacets(query: ProductListQuery = {}): Promise<ProductFacets> {
  // Backend real: vendrían junto al listado (fetch(apiBase + "/products?...")) o de un endpoint de facetas.
  const items = await filterProducts(query);
  const categories: Record<string, number> = {};
  const brandCounts: Record<string, number> = {};
  const colors = new Map<string, string>();
  for (const p of items) {
    categories[p.categorySlug] = (categories[p.categorySlug] ?? 0) + 1;
    brandCounts[p.vendor] = (brandCounts[p.vendor] ?? 0) + 1;
    for (const c of p.colors ?? []) if (!colors.has(c.name)) colors.set(c.name, c.hex);
  }
  return {
    categories,
    brands: Object.entries(brandCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
    colors: [...colors.entries()],
  };
}
