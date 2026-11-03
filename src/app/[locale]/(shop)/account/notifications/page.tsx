import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AccountShell } from "@/components/account/AccountShell";
import { NotificationsView } from "@/components/account/NotificationsView";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("notifications"), alternates: localeAlternates("/account/notifications", locale) };
}

export default async function AccountNotificationsPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "account" });
  return (
    <AccountShell active="notifications" crumb={t("notifications")}>
      <NotificationsView />
    </AccountShell>
  );
}
