import { hasLocale, IntlErrorCode } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Configuración de next-intl por petición: idioma y diccionario. Una clave que
 * falte rompe el build (todas las páginas se generan en él) y, en desarrollo, la
 * página; en producción se registra y se muestra "namespace.clave", nunca un hueco.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    onError(error) {
      const strict =
        process.env.NODE_ENV === "development" || process.env.NEXT_PHASE === "phase-production-build";
      if (strict && error.code === IntlErrorCode.MISSING_MESSAGE) throw error;
      console.error(error);
    },
  };
});
