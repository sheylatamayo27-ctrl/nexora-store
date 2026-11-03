import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AccountShell } from "@/components/account/AccountShell";
import { WishlistView } from "@/components/account/WishlistView";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("wishlist"), alternates: localeAlternates("/wishlist", locale) };
}

export default async function WishlistPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "account" });
  return (
    <AccountShell active="wishlist" crumb={t("wishlist")}>
      <WishlistView />
    </AccountShell>
  );
}
