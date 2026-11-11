"use client";

import { useState } from "react";
import { Mail, MailCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { notifyToast } from "@/lib/toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Recuperar contraseña. Solo front-end: valida el correo en el cliente y simula
 * el envío (no se manda nada a ningún sitio). Para conectarlo, cambia el bloque
 * marcado en `handleSubmit` por la llamada real (p. ej. POST /api/auth/forgot-password).
 */
export function ForgotPasswordView() {
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");
  const tValidation = useTranslations("validation");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<"emailRequired" | "email" | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("emailRequired");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setError("email");
      return;
    }
    // Envío simulado: aquí iría la petición al backend.
    setSentTo(value);
    notifyToast({ title: t("linkSentTitle"), description: t("linkSentDescription"), icon: MailCheck });
  };

  if (sentTo) {
    return (
      <AuthShell variant="signin">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100">
          <MailCheck className="h-7 w-7 text-brand-800" />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-h2 text-text-primary">{t("checkEmail")}</h1>
          <p className="text-body text-text-secondary">
            {t.rich("sentTo", {
              email: sentTo,
              highlight: (chunks) => <span className="text-label text-text-primary">{chunks}</span>,
            })}
          </p>
        </div>

        <ButtonLink href="/login" variant="primary" size="lg" fullWidth icon className="justify-center">
          {t("backToSignIn")}
        </ButtonLink>

        <div className="flex items-center justify-center gap-1.5">
          <span className="text-body text-text-secondary">{t("notYourEmail")}</span>
          <button
            type="button"
            onClick={() => setSentTo(null)}
            className="text-label text-brand-700 underline underline-offset-2"
          >
            {t("useAnother")}
          </button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell variant="signin">
      <div className="flex flex-col gap-1">
        <h1 className="text-h2 text-text-primary">{t("forgotPassword")}</h1>
        <p className="text-body text-text-secondary">{t("forgotSubtitle")}</p>
      </div>

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label={tCommon("fields.email")}
          icon={Mail}
          type="email"
          name="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          error={error !== null}
          aria-invalid={error !== null}
          helper={error ? tValidation(error) : undefined}
        />
        <Button type="submit" variant="primary" size="lg" fullWidth icon className="justify-center">
          {t("sendLink")}
        </Button>
      </form>

      <div className="flex items-center justify-center gap-1.5">
        <span className="text-body text-text-secondary">{t("remembered")}</span>
        <Link href="/login" className="text-label text-brand-700 underline underline-offset-2">
          {tCommon("signIn")}
        </Link>
      </div>
    </AuthShell>
  );
}
