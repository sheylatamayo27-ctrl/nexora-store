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

export interface PromoBanner {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  align: "left" | "center";
  href: string;
}
