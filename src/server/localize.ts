import type { BlogPost, Category, HeroSlide, Product, PromoBanner } from "@/data/types";
import { routing, type Locale } from "@/i18n/routing";
import type {
  BlogPostRecord,
  CategoryRecord,
  HeroSlideRecord,
  Localized,
  ProductRecord,
  PromoBannerRecord,
} from "./db/types";

/*
 * Registros de `./db` → tipos que ven los componentes, con los textos ya en un
 * idioma. Así los componentes siguen leyendo `product.name` como texto plano.
 */

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
