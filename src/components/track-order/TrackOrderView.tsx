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
import { notifyToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { trackOrder, type TrackingResult, type TrackingStatus } from "@/services/tracking";

const TRACKING_DEFAULTS: TrackingInput = { orderNumber: "", email: "" };

type StepState = "done" | "current" | "upcoming";
/** Claves del namespace "trackOrder". */
type TrackKey = Parameters<ReturnType<typeof useTranslations<"trackOrder">>>[0];

/** Texto de la etiqueta de estado (arriba a la derecha) para cada `currentStatus`. */
const STATUS_LABEL = {
  received: "stepReceived",
  processing: "stepProcessing",
  in_transit: "inTransit",
  delivered: "stepDelivered",
} as const satisfies Record<TrackingStatus, string>;

/**
 * Rastreo de pedido. La búsqueda la hace `trackOrder` (src/services/tracking.ts);
 * esta vista solo traduce y pinta el resultado: los pasos anteriores al estado
 * actual salen como hechos y los posteriores como pendientes.
 */
export function TrackOrderView() {
  const t = useTranslations("trackOrder");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const errorText = useErrorText();
  const [result, setResult] = useState<TrackingResult | null>(null);
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
      setResult(await trackOrder(data.orderNumber, data.email));
    } catch {
      notifyToast({ tone: "error", icon: AlertCircle, title: t("failed"), description: tCommon("checkConnection") });
    }
  };

  /** Traduce si `value` es una clave de "trackOrder" (el mock); si no, es texto que ya llega listo. */
  const text = (value: string) => (t.has(value as TrackKey) ? t(value as TrackKey) : value);
  const currentIndex = result ? result.steps.findIndex((s) => s.status === result.currentStatus) : -1;
  const stateOf = (i: number): StepState => (i < currentIndex ? "done" : i === currentIndex ? "current" : "upcoming");

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
              aria-required
              error={errorText(errors.orderNumber?.message)}
            />
            <FormField
              label={tCommon("fields.email")}
              icon={Mail}
              type="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              {...register("email")}
              aria-required
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
              <Truck className="h-4 w-4" /> {t(STATUS_LABEL[result.currentStatus])}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div className="flex items-center gap-3 rounded-lg bg-surface-subtle p-4">
              <CalendarDays className="h-5 w-5 shrink-0 text-brand-700" />
              <div className="flex flex-col">
                <span className="text-body-sm text-text-muted">{t("estimatedDelivery")}</span>
                <span className="text-label text-text-primary">{dateFormat.format(result.estimatedDelivery)}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-surface-subtle p-4">
              <Package className="h-5 w-5 shrink-0 text-brand-700" />
              <div className="flex min-w-0 flex-col">
                <span className="text-body-sm text-text-muted">{t("carrier")}</span>
                <span className="text-label text-text-primary">{text(result.carrier)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-label-lg text-text-primary">{t("steps")}</h3>
            <ol className="flex flex-col">
              {result.steps.map((step, i) => {
                const { date } = step;
                const state = stateOf(i);
                const last = i === result.steps.length - 1;
                return (
                  <li
                    key={step.status}
                    aria-current={state === "current" ? "step" : undefined}
                    className={cn("relative flex gap-4", !last && "pb-6")}
                  >
                    {!last && (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-4 top-9 bottom-1 w-0.5 -translate-x-1/2 rounded-full",
                          state === "done" ? "bg-success-500" : "bg-border"
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        state === "done" && "bg-success-500 text-white",
                        state === "current" && "bg-brand-700 text-white motion-safe:animate-pulse",
                        state === "upcoming" && "bg-border text-text-muted"
                      )}
                    >
                      {state === "done" ? (
                        <Check className="h-4 w-4" />
                      ) : state === "current" ? (
                        <Truck className="h-4 w-4" />
                      ) : (
                        <span className="text-label-sm">{i + 1}</span>
                      )}
                    </span>
                    <div className="flex flex-col pt-1">
                      <span className={cn("text-label", state === "upcoming" ? "text-text-muted" : "text-text-primary")}>
                        {text(step.label)}
                        {state === "current" && <span className="sr-only"> ({t("stepCurrent")})</span>}
                      </span>
                      <span className="text-body-sm text-text-secondary">
                        {state === "upcoming"
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
