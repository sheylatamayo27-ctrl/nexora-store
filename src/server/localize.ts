import type { BlogPost, Category, ContentPage, FaqGroup, HeroSlide, Product, PromoBanner } from "@/data/types";
import { routing, type Locale } from "@/i18n/routing";
import type {
  BlogPostRecord,
  CategoryRecord,
  ContentPageRecord,
  FaqGroupRecord,
  HeroSlideRecord,
  Localized,
  ProductRecord,
  PromoBannerRecord,
} from "./db/types";

/** Valor en `locale`; si falta (p. ej. un dato a medio traducir del backend), el del idioma por defecto. */
export function localize<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value[routing.defaultLocale];
}

export function toProduct(record: ProductRecord, locale: Locale): Product {
  const { name, badge, colors, shortDescription, ...rest } = record;
  return {
    ...rest,
    name: localize(name, locale),
    ...(badge && { badge: { type: badge.type, label: localize(badge.label, locale) } }),
    ...(colors && { colors: colors.map((c) => ({ name: localize(c.name, locale), hex: c.hex })) }),
    ...(shortDescription && { shortDescription: localize(shortDescription, locale) }),
  };
}

export function toCategory(record: CategoryRecord, locale: Locale): Category {
  return { ...record, name: localize(record.name, locale) };
}

export function toHeroSlide(record: HeroSlideRecord, locale: Locale): HeroSlide {
  return {
    image: record.image,
    badge: localize(record.badge, locale),
    title: localize(record.title, locale),
    subtitle: localize(record.subtitle, locale),
    primaryCta: { label: localize(record.primaryCta.label, locale), href: record.primaryCta.href },
    secondaryCta: { label: localize(record.secondaryCta.label, locale), href: record.secondaryCta.href },
  };
}

export function toPromoBanner(record: PromoBannerRecord, locale: Locale): PromoBanner {
  return {
    ...record,
    eyebrow: localize(record.eyebrow, locale),
    title: localize(record.title, locale),
    subtitle: localize(record.subtitle, locale),
  };
}

export function toBlogPost(record: BlogPostRecord, locale: Locale): BlogPost {
  return {
    ...record,
    title: localize(record.title, locale),
    excerpt: localize(record.excerpt, locale),
    category: localize(record.category, locale),
    author: { name: record.author.name, role: localize(record.author.role, locale) },
    content: localize(record.content, locale),
  };
}

export function toContentPage(record: ContentPageRecord, locale: Locale): ContentPage {
  const { title, subtitle, description, blocks, ...rest } = record;
  return {
    ...rest,
    title: localize(title, locale),
    ...(subtitle && { subtitle: localize(subtitle, locale) }),
    description: localize(description, locale),
    blocks: localize(blocks, locale),
  };
}

export function toFaqGroup(record: FaqGroupRecord, locale: Locale): FaqGroup {
  return {
    title: localize(record.title, locale),
    items: record.items.map((i) => ({ question: localize(i.question, locale), answer: localize(i.answer, locale) })),
  };
}
