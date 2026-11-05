import type { ProductListQuery, ProductSort } from "@/server/api-types";

/*
 * Filtros de la vista de categoría → parámetros de GET /api/products.
 * Lo usan la página (servidor, primera carga) y `CategoryView` (cliente, SWR):
 * así la key de la primera carga es la misma que la del fallback del servidor.
 */

export const PAGE_SIZE = 12;
export const PRICE_MIN = 0;
export const PRICE_MAX = 1100;

export type AvailId = "inStock" | "onSale" | "freeDelivery";

export interface CategoryFilters {
  cats: string[];
  price: [number, number];
  rating: number | null;
  brands: string[];
  colors: string[];
  avail: Record<AvailId, boolean>;
  sort: ProductSort;
}

/** Filtros al entrar en la vista (y tras "Limpiar todo", con `cats` vacío). */
export function defaultFilters(cats: string[] = []): CategoryFilters {
  return {
    cats,
    price: [PRICE_MIN, PRICE_MAX],
    rating: null,
    brands: [],
    colors: [],
    avail: { inStock: true, onSale: false, freeDelivery: false },
    sort: "popular",
  };
}

/**
 * Primera página del listado para estos filtros. `saleOnly`: vista de ofertas (solo
 * productos rebajados). El rango de precio completo no filtra; "Solo en stock" y
 * "Envío gratis" tampoco (el catálogo aún no tiene esos datos).
 */
export function toListQuery(filters: CategoryFilters, saleOnly: boolean): ProductListQuery {
  const { cats, price, rating, brands, colors, avail, sort } = filters;
  return {
    category: cats,
    brand: brands,
    color: colors,
    minPrice: price[0] !== PRICE_MIN ? price[0] : undefined,
    maxPrice: price[1] !== PRICE_MAX ? price[1] : undefined,
    minRating: rating ?? undefined,
    // La vista de ofertas y "En oferta" usan el mismo criterio: precio rebajado.
    sale: saleOnly || avail.onSale,
    sort,
    page: 1,
    pageSize: PAGE_SIZE,
  };
}
