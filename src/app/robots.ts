import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { absoluteUrl } from "@/lib/site";

/** Páginas privadas o de paso: no aportan nada en los buscadores. */
const PRIVATE_PATHS = ["/account", "/checkout", "/cart", "/order-confirmation"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // En español (/cart) y en inglés (/en/cart).
        disallow: routing.locales.flatMap((locale) =>
          PRIVATE_PATHS.map((href) => getPathname({ href, locale })),
        ),
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
