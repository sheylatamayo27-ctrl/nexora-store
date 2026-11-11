import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("orderConfirmation"), alternates: localeAlternates("/order-confirmation", locale) };
}

export default function OrderConfirmedLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  return children;
}
