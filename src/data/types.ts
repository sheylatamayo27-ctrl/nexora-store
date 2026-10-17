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
