import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AccountShell } from "@/components/account/AccountShell";
import { SettingsView } from "@/components/account/SettingsView";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("settings"), alternates: localeAlternates("/account/settings", locale) };
}

export default async function AccountSettingsPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "account" });
  return (
    <AccountShell active="settings" crumb={t("settings")}>
      <SettingsView />
    </AccountShell>
  );
}
