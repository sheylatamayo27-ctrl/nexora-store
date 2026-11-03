import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AppDocument } from "@/app/document";
import { siteMetadata } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

/** Todas las páginas se generan en el build para cada idioma. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Solo existen las rutas generadas: un idioma desconocido (p. ej. /favicon.ico, que
 * no pasa por el middleware) o un slug inexistente responden con la 404 (`app/not-found.tsx`).
 */
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
  // Fija el idioma de esta petición para que el render siga siendo estático.
  setRequestLocale(params.locale);

  return <AppDocument locale={params.locale}>{children}</AppDocument>;
}
