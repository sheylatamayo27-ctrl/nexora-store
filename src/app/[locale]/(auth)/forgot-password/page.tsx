import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ForgotPasswordView } from "@/components/auth/ForgotPasswordView";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("forgotPassword"), alternates: localeAlternates("/forgot-password", locale) };
}

export default function ForgotPasswordPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  return <ForgotPasswordView />;
}
