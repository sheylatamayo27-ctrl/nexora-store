import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/** URL pública del sitio (la misma que `metadataBase`). */
export const SITE_URL = "https://nexora.store";

/** URL absoluta de una ruta del sitio o de un archivo de /public ("/images/…"). */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** URL absoluta de una página en `locale` (en inglés lleva el prefijo /en). */
export function localizedUrl(pathname: string, locale: Locale): string {
  return absoluteUrl(getPathname({ href: pathname, locale }));
}
