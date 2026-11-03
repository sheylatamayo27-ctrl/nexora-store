import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OffersView } from "@/components/offers/OffersView";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { getDealProducts, getSaleProducts } from "@/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("offers"),
    description: t("offersDescription"),
    alternates: localeAlternates("/offers", locale),
  };
}

export default async function OffersPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const [saleProducts, dealProducts] = await Promise.all([getSaleProducts(locale), getDealProducts(locale)]);
  return <OffersView products={saleProducts} flashDeals={dealProducts} />;
}
