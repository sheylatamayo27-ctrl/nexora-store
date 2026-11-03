import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AccountShell } from "@/components/account/AccountShell";
import { AddressesView } from "@/components/account/AddressesView";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("addresses"), alternates: localeAlternates("/account/addresses", locale) };
}

export default async function AccountAddressesPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "account" });
  return (
    <AccountShell active="addresses" crumb={t("addresses")}>
      <AddressesView />
    </AccountShell>
  );
}
