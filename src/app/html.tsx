"use client";

import { jost } from "./fonts";

export function Html({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang} className={jost.variable}>
      {children}
    </html>
  );
}
