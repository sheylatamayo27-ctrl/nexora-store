import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getMegaMenuData } from "@/components/layout/mega-menu-data";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const megaMenu = await getMegaMenuData();

  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle">
      <Header megaMenu={megaMenu} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
