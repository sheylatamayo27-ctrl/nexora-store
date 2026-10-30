import type { BlogPost, Category, HeroSlide, Product, PromoBanner } from "@/data/types";

/** Tipos de dominio, re-exportados para que las rutas /api no importen de `@/data`. */
export type { BlogPost, Category, HeroSlide, Product, PromoBanner };

/** Criterios de orden de GET /api/products. `popular`: más reseñas primero. */
export type ProductSort = "relevance" | "popular" | "price-asc" | "price-desc" | "rating";

/** Parámetros (ya validados) del listado de productos. */
export interface ProductListQuery {
  page?: number;
  pageSize?: number;
  /** Slugs de categoría: basta con que coincida uno. */
  category?: string[];
  q?: string;
  /** Marcas (`vendor`): basta con que coincida una. */
  brand?: string[];
  /** Nombres de color: basta con que el producto tenga uno. */
  color?: string[];
  /** Rango de precio, extremos incluidos. */
  minPrice?: number;
  maxPrice?: number;
  /** Valoración mínima (4 → 4★ o más). */
  minRating?: number;
  sale?: boolean;
  deal?: boolean;
  featured?: boolean;
  sort?: ProductSort;
}

/** Facetas de un listado: las opciones (y sus conteos) del panel de filtros. */
export interface ProductFacets {
  /** Productos por categoría (slug → cantidad). */
  categories: Record<string, number>;
  /** Marcas con su cantidad: más productos primero, empate alfabético. */
  brands: [string, number][];
  /** Colores distintos (nombre, hex) en orden de aparición. */
  colors: [string, string][];
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Cuerpo de error de cualquier endpoint (400, 404). */
export interface ApiError {
  error: string;
}

// Respuesta de cada endpoint.
/** GET /api/products */
export type ProductListResponse = Paginated<Product>;
/** GET /api/products/[slug] */
export type ProductResponse = Product;
/** GET /api/categories */
export type CategoriesResponse = Category[];
/** GET /api/banners */
export type BannersResponse = PromoBanner[];
/** GET /api/hero */
export type HeroResponse = HeroSlide[];
/** GET /api/blog */
export interface BlogListResponse {
  items: BlogPost[];
  featured: BlogPost;
}
/** GET /api/blog/[slug] */
export interface BlogPostResponse {
  post: BlogPost;
  related: BlogPost[];
}
/** GET /api/search */
export type SearchResponse = Product[];
