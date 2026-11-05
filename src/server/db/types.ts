import type {
  BadgeType,
  BlogBlock,
  BlogPost,
  Category,
  ContentBlock,
  ContentPage,
  HeroSlide,
  Product,
  PromoBanner,
} from "@/data/types";
import type { Locale } from "@/i18n/routing";

/**
 * Registros de la "base de datos". Los campos traducibles guardan un valor por
 * idioma; el resto (precio, slug, imagen, valoración…) es igual que en el tipo
 * que ven los componentes. `src/server/localize.ts` los convierte a un idioma.
 */
export type Localized<T = string> = Record<Locale, T>;

export interface ProductRecord extends Omit<Product, "name" | "badge" | "colors" | "shortDescription"> {
  name: Localized;
  badge?: { type: BadgeType; label: Localized };
  colors?: { name: Localized; hex: string }[];
  shortDescription?: Localized;
}

export interface CategoryRecord extends Omit<Category, "name"> {
  name: Localized;
}

export interface HeroSlideRecord
  extends Omit<HeroSlide, "badge" | "title" | "subtitle" | "primaryCta" | "secondaryCta"> {
  badge: Localized;
  title: Localized;
  subtitle: Localized;
  primaryCta: { label: Localized; href: string };
  secondaryCta: { label: Localized; href: string };
}

export interface PromoBannerRecord extends Omit<PromoBanner, "eyebrow" | "title" | "subtitle"> {
  eyebrow: Localized;
  title: Localized;
  subtitle: Localized;
}

export interface BlogPostRecord extends Omit<BlogPost, "title" | "excerpt" | "category" | "author" | "content"> {
  title: Localized;
  excerpt: Localized;
  category: Localized;
  author: { name: string; role: Localized };
  /** Cada idioma tiene su propio cuerpo de artículo. */
  content: Localized<BlogBlock[]>;
}

export interface ContentPageRecord extends Omit<ContentPage, "title" | "subtitle" | "description" | "blocks"> {
  title: Localized;
  subtitle?: Localized;
  description: Localized;
  /** Cada idioma tiene su propio cuerpo. */
  blocks: Localized<ContentBlock[]>;
}

export interface FaqGroupRecord {
  title: Localized;
  items: { question: Localized; answer: Localized }[];
}

