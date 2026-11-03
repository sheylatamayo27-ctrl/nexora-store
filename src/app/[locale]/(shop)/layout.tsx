import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getMegaMenuData } from "@/components/layout/mega-menu-data";
import type { Locale } from "@/i18n/routing";

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
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
