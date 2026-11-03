import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AuthView } from "@/components/auth/AuthView";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("login"), alternates: localeAlternates("/login", locale) };
}

export default function SignInPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  return <AuthView mode="signin" />;
}
