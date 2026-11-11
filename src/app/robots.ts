import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { absoluteUrl } from "@/lib/site";

const PRIVATE_PATHS = ["/account", "/checkout", "/cart", "/order-confirmation"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: routing.locales.flatMap((locale) =>
          PRIVATE_PATHS.map((href) => getPathname({ href, locale })),
        ),
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
