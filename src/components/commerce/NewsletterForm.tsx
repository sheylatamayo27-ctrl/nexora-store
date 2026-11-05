"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/mini";
import { AlertCircle, Check, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Dots } from "@/components/ui/Dots";
import { FieldError } from "@/components/ui/FormField";
import { FORM_OPTIONS, useErrorText } from "@/lib/forms";
import { email } from "@/lib/schemas/common";
import { simulateRequest } from "@/lib/simulate";
import { notifyToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const newsletterSchema = z.object({ email });
type NewsletterData = z.infer<typeof newsletterSchema>;

/** Cuánto dura el "¡Suscrito!" del botón tras un envío correcto. */
const SUBSCRIBED_MS = 2000;

/**
 * Suscripción a la newsletter de la home (cambiar `simulateRequest` por
 * POST /api/newsletter). El error va debajo del campo sin empujar el bloque en
 * ≥sm (posición absoluta, sobre el padding de la tarjeta); en móvil, en línea.
 */
export function NewsletterForm() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const errorText = useErrorText();
  const [subscribed, setSubscribed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterData>({ resolver: zodResolver(newsletterSchema), defaultValues: { email: "" }, ...FORM_OPTIONS });

  useEffect(() => {
    if (!subscribed) return;
    const id = setTimeout(() => setSubscribed(false), SUBSCRIBED_MS);
    return () => clearTimeout(id);
  }, [subscribed]);

  const onSubmit = async () => {
    try {
      await simulateRequest(1000);
      reset();
      setSubscribed(true);
      notifyToast({ icon: Check, title: t("newsletterSuccess"), description: t("newsletterSuccessDescription") });
    } catch {
      notifyToast({
        tone: "error",
        icon: AlertCircle,
        title: t("newsletterFailed"),
        description: tCommon("checkConnection"),
      });
    }
  };

  const error = errorText(errors.email?.message);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-full max-w-md items-center gap-2 max-sm:flex-col max-sm:items-stretch"
    >
      <div className="relative sm:flex-1 max-sm:w-full">
        <div
          className={cn(
            "flex h-14 items-center gap-3 rounded-md bg-surface px-4 transition-shadow",
            error && "ring-2 ring-sale-500"
          )}
        >
          <Mail className="h-5 w-5 text-text-muted" />
          <input
            type="email"
            autoComplete="email"
            placeholder={t("newsletterPlaceholder")}
            aria-label={t("newsletterPlaceholder")}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "newsletter-email-error" : undefined}
            className="h-full flex-1 bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none"
            {...register("email")}
          />
        </div>
        {/* Rojo claro: el rojo de error no contrasta sobre el degradado azul. */}
        {error && (
          <FieldError
            id="newsletter-email-error"
            message={error}
            className="absolute left-0 top-full mt-2 text-sale-100 max-sm:static"
          />
        )}
      </div>
      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={isSubmitting}
        aria-busy={isSubmitting || undefined}
        className="disabled:opacity-80 max-sm:w-full"
      >
        {isSubmitting ? (
          <>
            <Dots size="sm" />
            {t("newsletterSubscribing")}
          </>
        ) : subscribed ? (
          <>
            <Check className="h-5 w-5" />
            {t("newsletterSubscribed")}
          </>
        ) : (
          t("subscribe")
        )}
      </Button>
    </form>
  );
}
