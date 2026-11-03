import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CartView } from "@/components/cart/CartView";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { getFeaturedProducts } from "@/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("cart"), alternates: localeAlternates("/cart", locale) };
}

export default async function CartPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  // "Comprados juntos frecuentemente": los 5 primeros destacados.
  const recommended = (await getFeaturedProducts(locale)).slice(0, 5);
  return <CartView recommended={recommended} />;
}
