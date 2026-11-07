"use client";

import { useTranslations } from "next-intl";
import { MAIN_CONTENT_ID } from "@/lib/a11y";

/**
 * "Saltar al contenido": primer elemento enfocable de la página. Invisible hasta
 * recibir el foco con Tab. Lleva el foco al `<main>` sin desplazar la página
 * (el header es sticky y taparía el comienzo del contenido).
 */
export function SkipLink() {
  const t = useTranslations("common");
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      onClick={(e) => {
        const main = document.getElementById(MAIN_CONTENT_ID);
        if (!main) return;
        e.preventDefault();
        main.focus({ preventScroll: true });
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-label focus:text-text-inverse focus:shadow-elevation-lg"
    >
      {t("skipToContent")}
    </a>
  );
}
