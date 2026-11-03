import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("checkout"), alternates: localeAlternates("/checkout", locale) };
}

export default function CheckoutPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  return <CheckoutView />;
}
