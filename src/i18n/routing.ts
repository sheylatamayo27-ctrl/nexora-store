import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },
});

export type Locale = (typeof routing.locales)[number];

export const intlLocales: Record<Locale, string> = { es: "es-MX", en: "en-US" };
export const ogLocales: Record<Locale, string> = { es: "es_MX", en: "en_US" };
