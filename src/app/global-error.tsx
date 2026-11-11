"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Html } from "./html";

const copy = {
  es: {
    title: "Algo salió mal",
    description: "No pudimos mostrar esta página. Inténtalo de nuevo en unos segundos.",
    retry: "Intentar de nuevo",
    goHome: "Volver al inicio",
    home: "/",
  },
  en: {
    title: "Something went wrong",
    description: "We couldn’t display this page. Please try again in a few seconds.",
    retry: "Try again",
    goHome: "Back to home",
    home: "/en",
  },
};

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  const [lang, setLang] = useState<keyof typeof copy>("es");
  const t = copy[lang];

  useEffect(() => {
    console.error(error);
    if (/^\/en(\/|$)/.test(window.location.pathname)) setLang("en");
  }, [error]);

  return (
    <Html lang={lang}>
      <body className="bg-surface-subtle font-sans">
        <main className="container-page flex min-h-screen items-center justify-center py-16">
          <div
            role="alert"
            className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl border border-border bg-surface p-8 text-center shadow-elevation-md max-sm:p-6"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sale-100">
              <AlertTriangle className="h-7 w-7 text-sale-500" />
            </span>
            <div className="flex flex-col gap-1">
              <h1 className="text-h3 text-text-primary">{t.title}</h1>
              <p className="text-body text-text-secondary">{t.description}</p>
            </div>
            {process.env.NODE_ENV === "development" && error.message && (
              <p className="w-full break-words rounded-md bg-sale-100 px-3 py-2 text-left text-body-sm text-sale-500">
                {error.message}
              </p>
            )}
            <div className="flex w-full flex-col gap-3 pt-2">
              <Button onClick={() => window.location.reload()} fullWidth>
                {t.retry}
              </Button>
              <a
                href={t.home}
                className="inline-flex h-11 w-full items-center justify-center rounded-md border border-border-strong px-5 text-label text-text-primary transition-colors hover:bg-surface-subtle"
              >
                {t.goHome}
              </a>
            </div>
          </div>
        </main>
      </body>
    </Html>
  );
}
