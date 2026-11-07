import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getMegaMenuData } from "@/components/layout/mega-menu-data";
import { PageDots } from "@/components/ui/Dots";
import type { Locale } from "@/i18n/routing";
import { MAIN_CONTENT_ID } from "@/lib/a11y";

export default async function ShopLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const megaMenu = await getMegaMenuData(locale);

  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle">
      <Header megaMenu={megaMenu} />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 focus:outline-none">
        <Suspense fallback={<PageDots />}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}
