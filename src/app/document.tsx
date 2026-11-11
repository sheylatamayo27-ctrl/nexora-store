import { NextIntlClientProvider } from "next-intl";
import { Html } from "./html";
import { Providers } from "./providers";
import { Toaster } from "@/components/layout/Toaster";
import { BackToTop } from "@/components/layout/BackToTop";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { SkipLink } from "@/components/layout/SkipLink";
import { StoreLocaleSync } from "@/components/layout/StoreLocaleSync";
import { ANNOUNCER_ID } from "@/lib/announce";
import type { Locale } from "@/i18n/routing";

export function AppDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <Html lang={locale}>
      <body className="font-sans">
        <NextIntlClientProvider locale={locale}>
          <SkipLink />
          <Providers>
            {children}
            <StoreLocaleSync />
          </Providers>
          <BackToTop />
          <Toaster />
          <CookieConsent />
        </NextIntlClientProvider>
        <div id={ANNOUNCER_ID} aria-live="polite" aria-atomic="true" className="sr-only" />
      </body>
    </Html>
  );
}
