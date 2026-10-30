import type { BlogPost } from "@/data/types";
import { blogPosts } from "./db/blog.data";

/*
 * Acceso al blog. Hoy lee de los artículos locales (`./db`); el día del CMS o
 * backend real, cada función cambia su cuerpo por el fetch indicado.
 */

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Backend real: fetch(apiBase + "/blog")
  return blogPosts;
}

/** Artículo destacado para la cabecera del blog. */
export async function getFeaturedPost(): Promise<BlogPost> {
  // Backend real: fetch(apiBase + "/blog?featured=true")
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  // Backend real: fetch(apiBase + "/blog/" + slug) — un 404 devuelve undefined.
  return blogPosts.find((p) => p.slug === slug);
}

/** Artículos relacionados: misma categoría primero, luego los más recientes. */
export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  // Backend real: fetch(apiBase + "/blog/" + slug + "/related?limit=" + limit)
  const current = await getPostBySlug(slug);
  if (!current) return blogPosts.slice(0, limit);
  const sameCategory = blogPosts.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = blogPosts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
