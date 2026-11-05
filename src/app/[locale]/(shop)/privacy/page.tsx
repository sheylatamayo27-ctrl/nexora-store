import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContentPageView, contentPageMetadata } from "@/components/content/ContentPageView";
import type { Locale } from "@/i18n/routing";

export function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  return contentPageMetadata("privacy", locale);
}

export default function PrivacyPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  return <ContentPageView slug="privacy" locale={locale} />;
}
