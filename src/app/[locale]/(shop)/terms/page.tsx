import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContentPageView, contentPageMetadata } from "@/components/content/ContentPageView";
import type { Locale } from "@/i18n/routing";

export function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  return contentPageMetadata("terms", locale);
}

export default function TermsPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  return <ContentPageView slug="terms" locale={locale} />;
}
