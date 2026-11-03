import { defineRouting } from "next-intl/routing";

/**
 * Idiomas de la tienda. El español es el idioma por defecto y va sin prefijo
 * (conserva las URLs de siempre: /cart, /product/…); el inglés vive bajo /en/….
 * Los segmentos y los slugs están en inglés en ambos idiomas: no se traducen.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  // La cookie de next-intl recuerda el idioma elegido en visitas futuras (un año).
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },
});

export type Locale = (typeof routing.locales)[number];

/**
 * Etiqueta regional para `Intl` (números, fechas) y para Open Graph. El español
 * usa es-MX: agrupa los miles ("1,240") igual que la web original.
 */
export const intlLocales: Record<Locale, string> = { es: "es-MX", en: "en-US" };
export const ogLocales: Record<Locale, string> = { es: "es_MX", en: "en_US" };
