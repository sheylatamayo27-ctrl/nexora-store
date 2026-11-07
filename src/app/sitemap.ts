import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/site";
import { getBlogPosts, getCategories, getProducts } from "@/server";

type Entry = MetadataRoute.Sitemap[number];
type Options = Pick<Entry, "lastModified" | "changeFrequency" | "priority">;

/**
 * Una entrada por idioma (/… en español, /en/… en inglés), cada una con sus
 * alternativas hreflang. Los slugs son iguales en los dos idiomas.
 */
function localized(pathname: string, options: Options): Entry[] {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(pathname, l)]));
  return routing.locales.map((locale) => ({
    url: localizedUrl(pathname, locale),
    alternates: { languages },
    ...options,
  }));
}

/** Páginas públicas sin datos (las privadas —cuenta, carrito, pago— quedan fuera; ver robots.ts). */
const STATIC_PAGES: [pathname: string, options: Options][] = [
  ["/", { changeFrequency: "daily", priority: 1 }],
  ["/offers", { changeFrequency: "daily", priority: 0.9 }],
  ["/new-arrivals", { changeFrequency: "weekly", priority: 0.8 }],
  ["/blog", { changeFrequency: "weekly", priority: 0.7 }],
  ["/search", { changeFrequency: "monthly", priority: 0.5 }],
  ["/about", { changeFrequency: "monthly", priority: 0.5 }],
  ["/faq", { changeFrequency: "monthly", priority: 0.5 }],
  ["/contact", { changeFrequency: "monthly", priority: 0.5 }],
  ["/track-order", { changeFrequency: "yearly", priority: 0.4 }],
  ["/shipping", { changeFrequency: "yearly", priority: 0.4 }],
  ["/returns", { changeFrequency: "yearly", priority: 0.4 }],
  ["/warranty", { changeFrequency: "yearly", priority: 0.4 }],
  ["/terms", { changeFrequency: "yearly", priority: 0.3 }],
  ["/privacy", { changeFrequency: "yearly", priority: 0.3 }],
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locale = routing.defaultLocale;
  const [products, categories, blogPosts] = await Promise.all([
    getProducts(locale),
    getCategories(locale),
    getBlogPosts(locale),
  ]);

  return [
    ...STATIC_PAGES.flatMap(([pathname, options]) =>
      localized(pathname, pathname === "/" ? { ...options, lastModified: new Date() } : options),
    ),
    ...products.flatMap((p) => localized(`/product/${p.slug}`, { changeFrequency: "weekly", priority: 0.8 })),
    ...categories.flatMap((c) => localized(`/category/${c.slug}`, { changeFrequency: "weekly", priority: 0.8 })),
    ...blogPosts.flatMap((post) =>
      localized(`/blog/${post.slug}`, {
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      }),
    ),
  ];
}
