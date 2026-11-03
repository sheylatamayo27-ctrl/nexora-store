"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Código corto de cada idioma (botón y opciones). */
const SHORT: Record<Locale, string> = { es: "ES", en: "EN" };

/**
 * Selector de idioma. El activo es el de la URL (`useLocale`), no un estado propio.
 * Elegir otro navega a la MISMA página en ese idioma con el router de next-intl:
 * transición de cliente, sin recarga y sin mover el scroll. next-intl guarda la
 * elección en su cookie (NEXT_LOCALE), que el middleware usa en visitas futuras.
 */
export function LanguageSelector() {
  const t = useTranslations("languages");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    // `pathname` va sin prefijo de idioma; se conserva la búsqueda (p. ej. ?q=…).
    router.replace(pathname + window.location.search, { locale: next, scroll: false });
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("label")}
        className="flex items-center gap-1 rounded-md px-1 py-1 text-label text-text-primary transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
      >
        <Globe className="h-[18px] w-[18px]" /> {SHORT[locale]}
        <ChevronDown
          className={cn("h-3.5 w-3.5 text-text-secondary transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-44 overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-elevation-lg"
          >
            {routing.locales.map((code) => (
              <li key={code} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={locale === code}
                  onClick={() => select(code)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-label transition-colors",
                    locale === code
                      ? "bg-brand-100 text-brand-800"
                      : "text-text-primary hover:bg-surface-subtle"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-label-sm text-text-muted">{SHORT[code]}</span>
                    {t(code)}
                  </span>
                  {locale === code && <Check className="h-4 w-4 text-brand-700" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
