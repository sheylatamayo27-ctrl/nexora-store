import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export const SITE_URL = "https://nexora.store";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function localizedUrl(pathname: string, locale: Locale): string {
  return absoluteUrl(getPathname({ href: pathname, locale }));
}
