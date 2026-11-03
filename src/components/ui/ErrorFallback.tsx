"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonLink } from "@/components/ui/Button";

/**
 * Pantalla de error de una ruta (la usan todos los `error.tsx`): avisa de que algo
 * falló y ofrece reintentar (`reset` vuelve a pintar el segmento) o volver al inicio.
 * El mensaje técnico del error solo se muestra en desarrollo.
 */
export function ErrorFallback({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
      <div
        role="alert"
        className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl border border-border bg-surface p-8 text-center shadow-elevation-md max-sm:p-6"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sale-100">
          <AlertTriangle className="h-7 w-7 text-sale-500" />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-h3 text-text-primary">{t("title")}</h1>
          <p className="text-body text-text-secondary">{t("description")}</p>
        </div>
        {process.env.NODE_ENV === "development" && error.message && (
          <p className="w-full break-words rounded-md bg-sale-100 px-3 py-2 text-left text-body-sm text-sale-500">
            {error.message}
          </p>
        )}
        <div className="flex w-full flex-col gap-3 pt-2">
          <Button onClick={reset} fullWidth>
            {t("retry")}
          </Button>
          <ButtonLink href="/" variant="outline" fullWidth>
            {t("goHome")}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
