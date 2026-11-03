"use client";

import { jost } from "./fonts";

/**
 * `<html>` con la fuente Jost. Es componente cliente a propósito: así Next adjunta
 * el CSS de la fuente (@font-face) a cada ruta que lo pinta, incluida la 404. Si lo
 * importara un Server Component, Next 14 lo deduplicaría entre layouts y en Windows
 * podría quedar fuera de la 404.
 */
export function Html({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang} className={jost.variable}>
      {children}
    </html>
  );
}
