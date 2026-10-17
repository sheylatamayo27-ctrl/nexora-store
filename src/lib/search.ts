import Fuse from "fuse.js";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import type { Product } from "@/data/types";

const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

/** Enriquecemos cada producto con el nombre de su categoría para poder buscarlo. */
const searchable = products.map((p) => ({ product: p, categoryName: categoryName(p.categorySlug) }));

/**
 * Índice de búsqueda difusa. Se construye una sola vez al cargar el módulo.
 * `threshold: 0.38` tolera erratas (p. ej. "auricolares") sin devolver ruido;
 * `ignoreLocation` permite que el término aparezca en cualquier parte del texto.
 */
const fuse = new Fuse(searchable, {
  keys: [
    { name: "product.name", weight: 0.6 },
    { name: "product.vendor", weight: 0.2 },
    { name: "categoryName", weight: 0.2 },
  ],
  threshold: 0.38,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

export function searchProducts(query: string, limit?: number): Product[] {
  const q = query.trim();
  if (q.length < 2) return [];
  const results = fuse.search(q, limit ? { limit } : undefined);
  return results.map((r) => r.item.product);
}
