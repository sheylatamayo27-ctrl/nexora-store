import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SearchResults } from "@/components/search/SearchResults";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("search"),
    description: t("searchDescription"),
    alternates: localeAlternates("/search", locale),
  };
}

export default function SearchPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  return (
    <Suspense fallback={null}>
      <SearchResults />
    </Suspense>
  );
}
