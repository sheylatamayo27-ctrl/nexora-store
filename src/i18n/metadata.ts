import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "./navigation";
import { ogLocales, routing, type Locale } from "./routing";

export async function siteMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("siteTitle");
  const description = t("siteDescription");

  return {
    title: { default: title, template: "%s | Nexora" },
    description,
    metadataBase: new URL("https://nexora.store"),
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      siteName: "Nexora",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function localeAlternates(pathname: string, locale: Locale): NonNullable<Metadata["alternates"]> {
  return {
    canonical: getPathname({ href: pathname, locale }),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, getPathname({ href: pathname, locale: l })])),
      "x-default": getPathname({ href: pathname, locale: routing.defaultLocale }),
    },
  };
}

export function socialMetadata(
  locale: Locale,
  page: {
    pathname: string;
    title: string;
    description: string;
    image: string;
    article?: { publishedTime: string; authors: string[] };
  },
): Pick<Metadata, "openGraph" | "twitter"> {
  const common = {
    locale: ogLocales[locale],
    alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
    siteName: "Nexora",
    url: getPathname({ href: page.pathname, locale }),
    title: page.title,
    description: page.description,
    images: [page.image],
  };
  return {
    openGraph: page.article
      ? { ...common, type: "article", publishedTime: page.article.publishedTime, authors: page.article.authors }
      : { ...common, type: "website" },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [page.image] },
  };
}
