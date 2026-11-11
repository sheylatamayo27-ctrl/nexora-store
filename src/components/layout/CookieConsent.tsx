"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cookie } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { readCookieConsent, saveCookieConsent, type CookieChoice } from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

const SHOW_DELAY = 1500;

const OPTIONAL = ["analytics", "marketing"] as const;
type Optional = (typeof OPTIONAL)[number];

export function CookieConsent() {
  const t = useTranslations("cookies");
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"banner" | "preferences">("banner");
  const [choice, setChoice] = useState<CookieChoice>({ analytics: false, marketing: false });
  const preferencesHeading = useRef<HTMLHeadingElement>(null);
  const descriptionId = useId();

  useEffect(() => {
    if (readCookieConsent()) return;
    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (view === "preferences") preferencesHeading.current?.focus();
  }, [view]);

  const save = (value: CookieChoice) => {
    saveCookieConsent(value);
    setOpen(false);
  };

  const hidden = reduceMotion ? { opacity: 0 } : { y: 100, opacity: 0 };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label={t("regionLabel")}
          aria-describedby={descriptionId}
          initial={hidden}
          animate={{ y: 0, opacity: 1 }}
          exit={hidden}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 max-h-[100dvh] overflow-y-auto border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] shadow-elevation-lg"
        >
          <div className="container-page py-6 max-lg:py-4">
            {view === "banner" ? (
              <div className="flex items-center gap-8 max-lg:flex-col max-lg:items-stretch max-lg:gap-4">
                <div className="flex flex-1 items-start gap-4 max-lg:gap-3">
                  <CookieIcon />
                  <div className="flex flex-col gap-1">
                    <h2 className="text-label-lg text-text-primary">
                      {t("title")}
                    </h2>
                    <p id={descriptionId} className="text-body-sm text-text-secondary">
                      {t("description")}{" "}
                      <PolicyLink>{t("policy")}</PolicyLink>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3 max-lg:flex-col max-lg:items-stretch">
                  <Button
                    variant="outline"
                    className="max-lg:w-full"
                    onClick={() => save({ analytics: false, marketing: false })}
                  >
                    {t("rejectOptional")}
                  </Button>
                  <Button variant="ghost" className="max-lg:w-full" onClick={() => setView("preferences")}>
                    {t("manage")}
                  </Button>
                  <Button className="max-lg:w-full" onClick={() => save({ analytics: true, marketing: true })}>
                    {t("acceptAll")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5 max-lg:gap-4">
                <div className="flex items-start gap-4 max-lg:gap-3">
                  <CookieIcon />
                  <div className="flex flex-col gap-1">
                    <h2
                      ref={preferencesHeading}
                      tabIndex={-1}
                      className="text-label-lg text-text-primary focus:outline-none"
                    >
                      {t("preferencesTitle")}
                    </h2>
                    <p id={descriptionId} className="text-body-sm text-text-secondary">
                      {t("preferencesDescription")}{" "}
                      <PolicyLink>{t("policy")}</PolicyLink>
                    </p>
                  </div>
                </div>

                <ul className="grid grid-cols-3 gap-4 max-lg:grid-cols-1 max-lg:gap-3">
                  <PreferenceRow
                    label={t("essential")}
                    description={t("essentialDescription")}
                    note={t("alwaysActive")}
                    checked
                    disabled
                  />
                  {OPTIONAL.map((key: Optional) => (
                    <PreferenceRow
                      key={key}
                      label={t(key)}
                      description={t(`${key}Description`)}
                      checked={choice[key]}
                      onToggle={() => setChoice((c) => ({ ...c, [key]: !c[key] }))}
                    />
                  ))}
                </ul>

                <div className="flex items-center justify-end gap-3 max-lg:flex-col max-lg:items-stretch">
                  <Button variant="outline" className="max-lg:w-full" onClick={() => save(choice)}>
                    {t("savePreferences")}
                  </Button>
                  <Button className="max-lg:w-full" onClick={() => save({ analytics: true, marketing: true })}>
                    {t("acceptAll")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CookieIcon() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800">
      <Cookie className="h-5 w-5" aria-hidden="true" />
    </span>
  );
}

function PolicyLink({ children }: { children: React.ReactNode }) {
  return (
    <Link href="/privacy" className="whitespace-nowrap text-label-sm text-brand-700 hover:underline">
      {children}
    </Link>
  );
}

function PreferenceRow({
  label,
  description,
  note,
  checked,
  disabled,
  onToggle,
}: {
  label: string;
  description: string;
  note?: string;
  checked: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}) {
  const descriptionId = useId();
  return (
    <li className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
      <div className="flex flex-col gap-1">
        <span className="text-label text-text-primary">{label}</span>
        <span id={descriptionId} className="text-body-sm text-text-secondary">
          {description}
        </span>
        {note && <span className="text-label-sm text-brand-700">{note}</span>}
      </div>
      <Switch
        label={label}
        describedBy={descriptionId}
        checked={checked}
        disabled={disabled}
        onToggle={onToggle}
      />
    </li>
  );
}

function Switch({
  label,
  describedBy,
  checked,
  disabled,
  onToggle,
}: {
  label: string;
  describedBy: string;
  checked: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-describedby={describedBy}
      disabled={disabled}
      onClick={onToggle}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none",
        checked ? "bg-brand-700" : "bg-border",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-5 w-5 rounded-full bg-white shadow-elevation-sm transition-all duration-200 motion-reduce:transition-none",
          checked ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}
