import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { AppDocument } from "./document";
import { NotFoundPage } from "@/components/layout/NotFoundPage";
import { siteMetadata } from "@/i18n/metadata";

/*
 * La 404 de toda la tienda (URLs inexistentes y slugs desconocidos). Se pinta por
 * petición en el idioma que fijó el middleware (/en/… → inglés); lo que no pasa por
 * él (p. ej. /favicon.ico) sale en el idioma por defecto.
 */

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { ...(await siteMetadata(locale)), title: { absolute: `${t("notFound")} | Nexora` } };
}

export default async function NotFound() {
  const locale = await getLocale();
  return (
    <AppDocument locale={locale}>
      <NotFoundPage locale={locale} />
    </AppDocument>
  );
}
