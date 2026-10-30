import type { Category, PromoBanner } from "@/data/types";
import { categories, promoBanners } from "./db/categories.data";

/*
 * Acceso a categorías y banners. Hoy lee del catálogo local (`./db`); el día del
 * backend real, cada función cambia su cuerpo por el fetch indicado.
 */

export async function getCategories(): Promise<Category[]> {
  // Backend real: fetch(apiBase + "/categories")
  return categories;
}

export async function getPromoBanners(): Promise<PromoBanner[]> {
  // Backend real: fetch(apiBase + "/promo-banners")
  return promoBanners;
}
