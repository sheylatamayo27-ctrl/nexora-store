import type { Product } from "@/data/types";
import { createProductSearch } from "@/lib/search";
import { products } from "./db/products.data";
import { categories } from "./db/categories.data";

/** Índice difuso sobre el catálogo local (configuración en `@/lib/search`). */
const search = createProductSearch(products, categories);

/** Busca productos por nombre, marca o categoría (tolera erratas). */
export async function searchProducts(query: string, limit?: number): Promise<Product[]> {
  // Backend real: fetch(apiBase + "/search?q=" + encodeURIComponent(query) + (limit ? "&limit=" + limit : ""))
  return search(query, limit);
}
