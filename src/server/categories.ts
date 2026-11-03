import type { Category, PromoBanner } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { categories, promoBanners } from "./db/categories.data";
import { toCategory, toPromoBanner } from "./localize";

/*
 * Acceso a categorías y banners. Hoy lee del catálogo local (`./db`); el día del
 * backend real, cada función cambia su cuerpo por el fetch indicado.
 */

export async function getCategories(locale: Locale): Promise<Category[]> {
  // Backend real: fetch(apiBase + "/categories?locale=" + locale)
  return categories.map((c) => toCategory(c, locale));
}

export async function getPromoBanners(locale: Locale): Promise<PromoBanner[]> {
  // Backend real: fetch(apiBase + "/promo-banners?locale=" + locale)
  return promoBanners.map((b) => toPromoBanner(b, locale));
}
