"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Mail, MailCheck, MessageSquare, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormField, TextareaField } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { FORM_OPTIONS, useErrorText } from "@/lib/forms";
import { CONTACT_MESSAGE_MAX, contactSchema, type ContactData } from "@/lib/schemas/contact";
import { simulateRequest } from "@/lib/simulate";
import { notifyToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const CONTACT_DEFAULTS: ContactData = { name: "", email: "", subject: "", message: "" };

/** Formulario de /contact. Envío simulado: cambia `simulateRequest` por POST /api/contact. */
export function ContactForm() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const errorText = useErrorText();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema), defaultValues: CONTACT_DEFAULTS, ...FORM_OPTIONS });

  const field = (name: keyof ContactData) => ({
    ...register(name),
    "aria-required": true,
    error: errorText(errors[name]?.message),
  });
  const length = watch("message").length;

  const onSubmit = async () => {
    try {
      await simulateRequest(1500);
      reset();
      notifyToast({ icon: MailCheck, title: t("sent"), description: t("sentDescription") });
    } catch {
      notifyToast({ tone: "error", icon: AlertCircle, title: t("failed"), description: tCommon("checkConnection") });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
        <FormField label={t("name")} icon={User} autoComplete="name" placeholder={t("namePlaceholder")} {...field("name")} />
        <FormField
          label={t("email")}
          icon={Mail}
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          {...field("email")}
        />
      </div>
      <FormField label={t("subject")} icon={MessageSquare} placeholder={t("subjectPlaceholder")} {...field("subject")} />
      <div className="flex flex-col gap-1.5">
        <TextareaField label={t("message")} rows={6} placeholder={t("messagePlaceholder")} {...field("message")} />
        <span
          className={cn("self-end text-body-sm", length > CONTACT_MESSAGE_MAX ? "text-sale-500" : "text-text-muted")}
          aria-live="polite"
        >
          {t("characters", { count: length, max: CONTACT_MESSAGE_MAX })}
        </span>
      </div>
      <SubmitButton busy={isSubmitting} busyLabel={t("sending")}>
        {t("send")}
      </SubmitButton>
    </form>
  );
}
