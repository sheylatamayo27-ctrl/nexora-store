import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AppDocument } from "@/app/document";
import { siteMetadata } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return siteMetadata(hasLocale(routing.locales, params.locale) ? params.locale : routing.defaultLocale);
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, params.locale)) notFound();
  setRequestLocale(params.locale);

  return <AppDocument locale={params.locale}>{children}</AppDocument>;
}
