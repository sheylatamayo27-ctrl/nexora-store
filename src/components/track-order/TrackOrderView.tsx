"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CalendarDays, Check, Hash, Mail, Package, Truck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { FormField } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Link } from "@/i18n/navigation";
import { intlLocales, type Locale } from "@/i18n/routing";
import { FORM_OPTIONS, useErrorText } from "@/lib/forms";
import { trackingSchema, type TrackingData, type TrackingInput } from "@/lib/schemas/tracking";
import { simulateRequest } from "@/lib/simulate";
import { notifyToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const TRACKING_DEFAULTS: TrackingInput = { orderNumber: "", email: "" };
const DAY = 24 * 60 * 60 * 1000;

type StepState = "done" | "current" | "upcoming";

/**
 * Pasos del seguimiento de ejemplo, con fechas relativas a la consulta (así nunca
 * se ven caducadas). `offset`: días desde hoy; `time`: hora local "HH:MM".
 */
const steps: { label: "stepReceived" | "stepProcessing" | "stepInTransit" | "stepDelivered"; state: StepState; offset: number; time: string }[] = [
  { label: "stepReceived", state: "done", offset: -2, time: "10:42" },
  { label: "stepProcessing", state: "done", offset: -1, time: "09:15" },
  { label: "stepInTransit", state: "current", offset: 0, time: "07:30" },
  { label: "stepDelivered", state: "upcoming", offset: 2, time: "18:00" },
];

function at(now: number, offset: number, time: string) {
  const date = new Date(now + offset * DAY);
  const [h, m] = time.split(":").map(Number);
  date.setHours(h, m, 0, 0);
  return date;
}

/**
 * Rastreo de pedido. Búsqueda simulada: cualquier número válido devuelve el mismo
 * envío de ejemplo "En camino". Para conectarlo, cambia `simulateRequest` por
 * GET /api/orders/[número]?email=… y pinta su estado real.
 */
export function TrackOrderView() {
  const t = useTranslations("trackOrder");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const errorText = useErrorText();
  const [result, setResult] = useState<{ orderNumber: string; now: number } | null>(null);
  const resultRef = useRef<HTMLElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrackingInput, unknown, TrackingData>({
    resolver: zodResolver(trackingSchema),
    defaultValues: TRACKING_DEFAULTS,
    ...FORM_OPTIONS,
  });

  // Al llegar el resultado, se lleva a la vista (en móvil queda debajo del pliegue).
  useEffect(() => {
    if (result) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [result]);

  const onSubmit = async (data: TrackingData) => {
    try {
      await simulateRequest(1500);
      setResult({ orderNumber: data.orderNumber, now: Date.now() });
    } catch {
      notifyToast({ tone: "error", icon: AlertCircle, title: t("failed"), description: tCommon("checkConnection") });
    }
  };

  const dateFormat = new Intl.DateTimeFormat(intlLocales[locale], { weekday: "short", day: "numeric", month: "short" });
  const timeFormat = new Intl.DateTimeFormat(intlLocales[locale], { hour: "2-digit", minute: "2-digit" });
  const card = "flex flex-col gap-6 rounded-2xl border border-border bg-surface p-8 shadow-elevation-sm max-sm:p-5";

  return (
    <div className="flex flex-col gap-6">
      <section className={card}>
        <div className="flex flex-col gap-1">
          <h2 className="text-h4 text-text-primary">{t("formTitle")}</h2>
          <p className="text-body text-text-secondary">{t("formDescription")}</p>
        </div>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            <FormField
              label={t("orderNumber")}
              icon={Hash}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder={t("orderPlaceholder")}
              {...register("orderNumber")}
              error={errorText(errors.orderNumber?.message)}
            />
            <FormField
              label={tCommon("fields.email")}
              icon={Mail}
              type="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              {...register("email")}
              error={errorText(errors.email?.message)}
            />
          </div>
          <SubmitButton busy={isSubmitting} busyLabel={t("searching")}>
            {t("submit")}
          </SubmitButton>
        </form>
      </section>

      {result && (
        <section ref={resultRef} aria-live="polite" className={cn(card, "scroll-mt-28 motion-safe:animate-fade-in")}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-h4 text-text-primary">{t("order", { number: result.orderNumber })}</h2>
            <span className="flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-label-sm text-brand-800">
              <Truck className="h-4 w-4" /> {t("inTransit")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div className="flex items-center gap-3 rounded-lg bg-surface-subtle p-4">
              <CalendarDays className="h-5 w-5 shrink-0 text-brand-700" />
              <div className="flex flex-col">
                <span className="text-body-sm text-text-muted">{t("estimatedDelivery")}</span>
                <span className="text-label text-text-primary">{dateFormat.format(at(result.now, 2, "18:00"))}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-surface-subtle p-4">
              <Package className="h-5 w-5 shrink-0 text-brand-700" />
              <div className="flex min-w-0 flex-col">
                <span className="text-body-sm text-text-muted">{t("carrier")}</span>
                <span className="text-label text-text-primary">{t("carrierName")}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-label-lg text-text-primary">{t("steps")}</h3>
            <ol className="flex flex-col">
              {steps.map((step, i) => {
                const date = at(result.now, step.offset, step.time);
                const last = i === steps.length - 1;
                return (
                  <li
                    key={step.label}
                    aria-current={step.state === "current" ? "step" : undefined}
                    className={cn("relative flex gap-4", !last && "pb-6")}
                  >
                    {!last && (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-4 top-9 bottom-1 w-0.5 -translate-x-1/2 rounded-full",
                          step.state === "done" ? "bg-success-500" : "bg-border"
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        step.state === "done" && "bg-success-500 text-white",
                        step.state === "current" && "bg-brand-700 text-white motion-safe:animate-pulse",
                        step.state === "upcoming" && "bg-border text-text-muted"
                      )}
                    >
                      {step.state === "done" ? (
                        <Check className="h-4 w-4" />
                      ) : step.state === "current" ? (
                        <Truck className="h-4 w-4" />
                      ) : (
                        <span className="text-label-sm">{i + 1}</span>
                      )}
                    </span>
                    <div className="flex flex-col pt-1">
                      <span className={cn("text-label", step.state === "upcoming" ? "text-text-muted" : "text-text-primary")}>
                        {t(step.label)}
                        {step.state === "current" && <span className="sr-only"> ({t("stepCurrent")})</span>}
                      </span>
                      <span className="text-body-sm text-text-secondary">
                        {step.state === "upcoming"
                          ? `${t("stepPending")} · ${dateFormat.format(date)}`
                          : `${dateFormat.format(date)} · ${timeFormat.format(date)}`}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <p className="border-t border-border pt-4 text-body-sm text-text-secondary">
            {t.rich("help", {
              link: (chunks) => (
                <Link href="/contact" className="text-label-sm text-brand-700 underline underline-offset-2">
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </section>
      )}
    </div>
  );
}
