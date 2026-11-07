import { NextIntlClientProvider } from "next-intl";
import { Html } from "./html";
import { Providers } from "./providers";
import { Toaster } from "@/components/layout/Toaster";
import { BackToTop } from "@/components/layout/BackToTop";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { StoreLocaleSync } from "@/components/layout/StoreLocaleSync";
import type { Locale } from "@/i18n/routing";

/**
 * Documento HTML de la tienda en un idioma: `<html lang>`, fuente, proveedores y
 * piezas globales. Lo usan el layout de `[locale]` y la 404 raíz.
 * `NextIntlClientProvider` pasa a los componentes cliente el idioma y su diccionario.
 */
export function AppDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <Html lang={locale}>
      <body className="font-sans">
        <NextIntlClientProvider locale={locale}>
          <Providers>
            {children}
            <StoreLocaleSync />
          </Providers>
          <BackToTop />
          <Toaster />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </Html>
  );
}
