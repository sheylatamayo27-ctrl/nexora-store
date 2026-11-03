import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "./navigation";
import { ogLocales, routing, type Locale } from "./routing";

/** Metadata común del sitio en `locale` (título por defecto, plantilla, Open Graph). */
export async function siteMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("siteTitle");
  const description = t("siteDescription");

  // Íconos e imagen para redes: archivos icon.png, apple-icon.png,
  // opengraph-image.png y twitter-image.png en src/app (convención de Next).
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

/**
 * Canonical y hreflang (es, en y x-default) de una página. `pathname` va sin prefijo
 * de idioma (p. ej. "/cart"); en inglés se publica como /en/cart.
 */
export function localeAlternates(pathname: string, locale: Locale): NonNullable<Metadata["alternates"]> {
  return {
    canonical: getPathname({ href: pathname, locale }),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, getPathname({ href: pathname, locale: l })])),
      "x-default": getPathname({ href: pathname, locale: routing.defaultLocale }),
    },
  };
}
