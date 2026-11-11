import Fuse from "fuse.js";
import type { Category, Product } from "@/data/types";

/**
 * Crea un buscador difuso sobre un catálogo. El índice se construye una sola vez
 * (al llamar a esta función). Solo se usa en el servidor (`src/server/search.ts`,
 * detrás de GET /api/search); los componentes buscan con `useSearch`.
 * `threshold: 0.38` tolera erratas (p. ej. "auricolares") sin devolver ruido;
 * `ignoreLocation` permite que el término aparezca en cualquier parte del texto.
 */
export function createProductSearch(productList: Product[], categoryList: Category[]) {
  const categoryName = (slug: string) => categoryList.find((c) => c.slug === slug)?.name ?? slug;

  const searchable = productList.map((p) => ({ product: p, categoryName: categoryName(p.categorySlug) }));

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

  return (query: string, limit?: number): Product[] => {
    const q = query.trim();
    if (q.length < 2) return [];
    const results = fuse.search(q, limit ? { limit } : undefined);
    return results.map((r) => r.item.product);
  };
}
