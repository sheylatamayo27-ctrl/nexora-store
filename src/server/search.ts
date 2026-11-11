import type { Product } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { createProductSearch } from "@/lib/search";
import { products } from "./db/products.data";
import { categories } from "./db/categories.data";
import { toCategory, toProduct } from "./localize";

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

export async function searchProducts(query: string, locale: Locale, limit?: number): Promise<Product[]> {
  // Backend real: fetch(apiBase + "/search?q=" + encodeURIComponent(query) + "&locale=" + locale + (limit ? "&limit=" + limit : ""))
  return searcherFor(locale)(query, limit);
}
