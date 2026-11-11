import type { BlogPost, Product } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { STORE_CONTACT } from "@/components/layout/store-info";
import { assetSrc } from "@/lib/assets";
import { SITE_URL, absoluteUrl, localizedUrl } from "@/lib/site";

export type JsonLdObject = Record<string, unknown>;

const ORGANIZATION_NAME = "Nexora";
const LOGO_URL = absoluteUrl("/icon-512.png");
const CURRENCY = "USD";

const publisher = {
  "@type": "Organization",
  name: ORGANIZATION_NAME,
  logo: { "@type": "ImageObject", url: LOGO_URL },
} as const;

export function websiteJsonLd(locale: Locale, description: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORGANIZATION_NAME,
    url: localizedUrl("/", locale),
    description,
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${localizedUrl("/search", locale)}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: STORE_CONTACT.phone.replace(/\s+/g, "-"),
      email: STORE_CONTACT.email,
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
  };
}

export function productJsonLd(product: Product, locale: Locale, description: string): JsonLdObject {
  const url = localizedUrl(`/product/${product.slug}`, locale);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description,
    image: absoluteUrl(assetSrc("products", product.image)),
    brand: { "@type": "Brand", name: product.vendor },
    sku: product.id,
    url,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: CURRENCY,
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: ORGANIZATION_NAME },
    },
    ...(product.reviews > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviews,
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; href?: string }[], locale: Locale): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: localizedUrl(item.href, locale) } : {}),
    })),
  };
}

export function blogPostJsonLd(post: BlogPost, locale: Locale): JsonLdObject {
  const url = localizedUrl(`/blog/${post.slug}`, locale);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: locale,
    url,
    mainEntityOfPage: url,
    author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role },
    image: absoluteUrl(assetSrc(post.coverFolder, post.cover)),
    publisher,
  };
}
