export type BadgeType = "sale" | "new" | "hot";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  vendor: string;
  /** clave de imagen en /public/images/products */
  image: string;
  categorySlug: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge?: { type: BadgeType; label: string };
  colors?: ProductColor[];
  /** stock vendido / total para barras de progreso (ofertas) */
  sold?: { current: number; total: number };
  shortDescription?: string;
}

export interface Category {
  slug: string;
  name: string;
  /** clave de imagen en /public/images/products (reutilizamos las fotos) */
  image: string;
  itemCount: number;
}

export interface HeroSlide {
  /** clave de imagen en /public/images/misc */
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface PromoBanner {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  align: "left" | "center";
  href: string;
}

/** Carpeta de imágenes en /public/images (coincide con AssetFolder). */
export type ImageFolder = "products" | "banners" | "misc";

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: { name: string; role: string };
  /** Fecha de publicación en formato ISO (YYYY-MM-DD). */
  date: string;
  readingMinutes: number;
  /** Clave de imagen de portada y su carpeta en /public/images. */
  cover: string;
  coverFolder: ImageFolder;
  featured?: boolean;
  content: BlogBlock[];
}

/** Páginas de contenido estático (legales e informativas). */
export type ContentPageSlug = "terms" | "privacy" | "shipping" | "returns" | "warranty" | "about";

/** Ícono de una tarjeta de contenido; `ContentBlocks` lo resuelve a lucide. */
export type ContentIcon = "quality" | "service" | "innovation" | "trust";

/**
 * Bloques de una página de contenido. En los textos, `[texto](/ruta)` es un
 * enlace (interno si empieza por "/"; si no, p. ej. `mailto:`, externo).
 */
export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  /** `check`/`cross`: lista de lo que sí/no incluye algo (p. ej. la garantía). */
  | { type: "list"; items: string[]; tone?: "check" | "cross" }
  /** Pasos numerados (proceso de devolución). */
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "cards"; items: { icon: ContentIcon; title: string; text: string }[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  /** Tabla de métodos y tarifas de envío; se pinta con los precios de `src/lib/shipping.ts`. */
  | { type: "shippingRates" };

export interface ContentPage {
  slug: ContentPageSlug;
  title: string;
  subtitle?: string;
  /** Meta description. */
  description: string;
  /** Última actualización (ISO, YYYY-MM-DD); solo en las páginas legales. */
  updated?: string;
  blocks: ContentBlock[];
}

export interface FaqGroup {
  title: string;
  /** Respuestas con la misma sintaxis de enlaces que `ContentBlock`. */
  items: { question: string; answer: string }[];
}
