import type { BlogPost } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { blogPosts } from "./db/blog.data";
import { toBlogPost } from "./localize";

/*
 * Acceso al blog. Hoy lee de los artículos locales (`./db`); el día del CMS o
 * backend real, cada función cambia su cuerpo por el fetch indicado.
 */

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  // Backend real: fetch(apiBase + "/blog?locale=" + locale)
  return blogPosts.map((p) => toBlogPost(p, locale));
}

export async function getFeaturedPost(locale: Locale): Promise<BlogPost> {
  // Backend real: fetch(apiBase + "/blog?featured=true&locale=" + locale)
  const posts = await getBlogPosts(locale);
  return posts.find((p) => p.featured) ?? posts[0];
}

export async function getPostBySlug(slug: string, locale: Locale): Promise<BlogPost | undefined> {
  // Backend real: fetch(apiBase + "/blog/" + slug + "?locale=" + locale) — un 404 devuelve undefined.
  const record = blogPosts.find((p) => p.slug === slug);
  return record && toBlogPost(record, locale);
}

export async function getRelatedPosts(slug: string, locale: Locale, limit = 3): Promise<BlogPost[]> {
  // Backend real: fetch(apiBase + "/blog/" + slug + "/related?limit=" + limit + "&locale=" + locale)
  const posts = await getBlogPosts(locale);
  const current = posts.find((p) => p.slug === slug);
  if (!current) return posts.slice(0, limit);
  const sameCategory = posts.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = posts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
