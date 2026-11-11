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
  image: string;
  categorySlug: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge?: { type: BadgeType; label: string };
  colors?: ProductColor[];
  sold?: { current: number; total: number };
  shortDescription?: string;
}

export interface Category {
  slug: string;
  name: string;
  image: string;
  itemCount: number;
}

export interface HeroSlide {
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
  date: string;
  readingMinutes: number;
  cover: string;
  coverFolder: ImageFolder;
  featured?: boolean;
  content: BlogBlock[];
}

export type ContentPageSlug = "terms" | "privacy" | "shipping" | "returns" | "warranty" | "about";

export type ContentIcon = "quality" | "service" | "innovation" | "trust";

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; tone?: "check" | "cross" }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "cards"; items: { icon: ContentIcon; title: string; text: string }[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "shippingRates" };

export interface ContentPage {
  slug: ContentPageSlug;
  title: string;
  subtitle?: string;
  description: string;
  updated?: string;
  blocks: ContentBlock[];
}

export interface FaqGroup {
  title: string;
  items: { question: string; answer: string }[];
}
