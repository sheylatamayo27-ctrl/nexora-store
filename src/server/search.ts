import type { Product } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { createProductSearch } from "@/lib/search";
import { products } from "./db/products.data";
import { categories } from "./db/categories.data";
import { toCategory, toProduct } from "./localize";

/**
 * Un índice difuso por idioma (configuración en `@/lib/search`): en inglés se
 * busca por los nombres en inglés. Se construye la primera vez que se usa.
 */
const searchers = new Map<Locale, ReturnType<typeof createProductSearch>>();

function searcherFor(locale: Locale) {
  let search = searchers.get(locale);
  if (!search) {
    search = createProductSearch(
      products.map((p) => toProduct(p, locale)),
      categories.map((c) => toCategory(c, locale))
    );
    searchers.set(locale, search);
  }
  return search;
}

/** Busca productos por nombre, marca o categoría (tolera erratas). */
export async function searchProducts(query: string, locale: Locale, limit?: number): Promise<Product[]> {
  // Backend real: fetch(apiBase + "/search?q=" + encodeURIComponent(query) + "&locale=" + locale + (limit ? "&limit=" + limit : ""))
  return searcherFor(locale)(query, limit);
}
