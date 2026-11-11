import type { BlogPost, Category, HeroSlide, Product, PromoBanner } from "@/data/types";

export type { BlogPost, Category, HeroSlide, Product, PromoBanner };

/** Criterios de orden de GET /api/products. `popular`: más reseñas primero. */
export type ProductSort = "relevance" | "popular" | "price-asc" | "price-desc" | "rating";

export interface ProductListQuery {
  page?: number;
  pageSize?: number;
  ids?: string[];
  category?: string[];
  q?: string;
  brand?: string[];
  color?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sale?: boolean;
  deal?: boolean;
  featured?: boolean;
  sort?: ProductSort;
}

export interface ProductFacets {
  categories: Record<string, number>;
  brands: [string, number][];
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
