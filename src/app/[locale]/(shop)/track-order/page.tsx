import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import { TrackOrderView } from "@/components/track-order/TrackOrderView";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("trackOrder"),
    description: t("trackOrderDescription"),
    alternates: localeAlternates("/track-order", locale),
  };
}

export default async function TrackOrderPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "trackOrder" });
  return (
    <ContentPageLayout title={t("title")} subtitle={t("subtitle")}>
      <TrackOrderView />
    </ContentPageLayout>
  );
}
