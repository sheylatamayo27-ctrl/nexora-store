import type { routing } from "./routing";
import type messages from "../../messages/es.json";

/**
 * Tipado estricto de next-intl: `useLocale()` devuelve `Locale` y `t("…")` solo
 * acepta claves que existan en el diccionario (una clave inventada no compila).
 * `scripts/check-messages.mjs` comprueba que en.json tenga exactamente las mismas.
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
