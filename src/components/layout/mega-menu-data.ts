import { getBlogPosts, getCategories, getSaleProducts } from "@/server";
import { discountPercent } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { MegaMenuData } from "./MegaMenu";

/**
 * Datos del mega-menú en `locale`. Solo para Server Components (el layout de la
 * tienda y la 404), que se los pasan al Header por props: el cliente nunca importa `@/server`.
 */
export async function getMegaMenuData(locale: Locale): Promise<MegaMenuData> {
  const [categories, saleProducts, posts] = await Promise.all([
    getCategories(locale),
    getSaleProducts(locale),
    getBlogPosts(locale),
  ]);

  return {
    categories: categories.slice(0, 10),
    deals: [...saleProducts]
      .sort((a, b) => (discountPercent(b.price, b.compareAt) ?? 0) - (discountPercent(a.price, a.compareAt) ?? 0))
      .slice(0, 4),
    posts: posts
      .slice(0, 4)
      .map(({ slug, title, category, cover, coverFolder, readingMinutes }) => ({
        slug,
        title,
        category,
        cover,
        coverFolder,
        readingMinutes,
      })),
  };
}
