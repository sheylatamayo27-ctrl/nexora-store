"use client";

import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Phone, AlertCircle, UserCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { AuthShell } from "@/components/auth/AuthShell";
import { FieldError } from "@/components/ui/FieldError";
import { FormField } from "@/components/ui/FormField";
import { Checkbox } from "@/components/ui/Checkbox";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Link, useRouter } from "@/i18n/navigation";
import { notifyToast } from "@/lib/toast";
import { simulateRequest } from "@/lib/simulate";
import { FORM_OPTIONS, useErrorText } from "@/lib/forms";
import { loginSchema, registerSchema, type LoginData, type RegisterData } from "@/lib/schemas/auth";

/** Valores de ejemplo con los que arrancan los formularios. */
const SIGNIN_DEFAULTS: LoginData = { email: "sheyla@nexora.store", password: "password123" };
const SIGNUP_DEFAULTS: RegisterData = {
  firstName: "Sheyla",
  lastName: "Tamayo",
  email: "sheyla@nexora.store",
  phone: "+52 55 9876 5432",
  // Mismo largo que la de inicio de sesión (enmascarada se ve igual), pero con la mayúscula que pide el registro.
  password: "Password123",
  acceptTerms: true,
};

/**
 * Inicio de sesión. Solo front-end: valida con zod (al salir de cada campo y al
 * enviar) y simula la petición; para conectarlo, cambia `simulateRequest` por
 * la llamada real (p. ej. POST /api/auth/login con los datos validados).
 */
function SignInForm() {
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");
  const errorText = useErrorText();
  const router = useRouter();
  const [navigating, startNavigation] = useTransition();
  const [remember, setRemember] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema), defaultValues: SIGNIN_DEFAULTS, ...FORM_OPTIONS });

  const field = (name: keyof LoginData) => ({
    ...register(name),
    defaultValue: SIGNIN_DEFAULTS[name],
    error: errorText(errors[name]?.message),
  });

  const onSubmit = async () => {
    try {
      await simulateRequest(1000);
      startNavigation(() => router.push("/account"));
    } catch {
      notifyToast({
        tone: "error",
        icon: AlertCircle,
        title: t("signInFailed"),
        description: tCommon("checkConnection"),
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <FormField label={tCommon("fields.email")} icon={Mail} type="email" autoComplete="email" {...field("email")} />
      <FormField
        label={tCommon("fields.password")}
        icon={Lock}
        type="password"
        autoComplete="current-password"
        {...field("password")}
      />

      <div className="flex items-center justify-between">
        <Checkbox checked={remember} onChange={setRemember} label={t("rememberMe")} />
        <Link href="/forgot-password" className="text-label text-brand-700">
          {t("forgotPassword")}
        </Link>
      </div>

      <SubmitButton busy={isSubmitting || navigating} busyLabel={t("signingIn")} icon>
        {tCommon("signIn")}
      </SubmitButton>
    </form>
  );
}

/** Registro. Mismo funcionamiento que `SignInForm` (cambiar por POST /api/auth/register). */
function SignUpForm() {
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");
  const errorText = useErrorText();
  const router = useRouter();
  const [navigating, startNavigation] = useTransition();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema), defaultValues: SIGNUP_DEFAULTS, ...FORM_OPTIONS });

  const field = (name: Exclude<keyof RegisterData, "acceptTerms">) => ({
    ...register(name),
    defaultValue: SIGNUP_DEFAULTS[name],
    error: errorText(errors[name]?.message),
  });

  const onSubmit = async () => {
    try {
      await simulateRequest(1000);
      notifyToast({ icon: UserCheck, title: t("accountCreated"), description: t("accountCreatedDescription") });
      startNavigation(() => router.push("/account"));
    } catch {
      notifyToast({
        tone: "error",
        icon: AlertCircle,
        title: t("signUpFailed"),
        description: tCommon("checkConnection"),
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={tCommon("fields.firstName")} autoComplete="given-name" {...field("firstName")} />
        <FormField label={tCommon("fields.lastName")} autoComplete="family-name" {...field("lastName")} />
      </div>
      <FormField label={tCommon("fields.email")} icon={Mail} type="email" autoComplete="email" {...field("email")} />
      <FormField label={tCommon("fields.phone")} icon={Phone} type="tel" autoComplete="tel" {...field("phone")} />
      <FormField
        label={tCommon("fields.password")}
        icon={Lock}
        type="password"
        autoComplete="new-password"
        {...field("password")}
      />

      <Controller
        control={control}
        name="acceptTerms"
        render={({ field: terms, fieldState }) => (
          <div className="flex flex-col gap-2">
            <Checkbox checked={terms.value} onChange={terms.onChange} label={t("acceptTerms")} />
            {fieldState.error && <FieldError message={errorText(fieldState.error.message) ?? ""} />}
          </div>
        )}
      />

      <SubmitButton busy={isSubmitting || navigating} busyLabel={t("creatingAccount")} icon>
        {tCommon("createAccount")}
      </SubmitButton>
    </form>
  );
}

export function AuthView({ mode }: { mode: "signin" | "signup" }) {
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");
  const isSignup = mode === "signup";

  return (
    <AuthShell variant={mode}>
      <div className="flex flex-col gap-1">
        <h1 className="text-h2 text-text-primary">{isSignup ? t("signUpTitle") : t("signInTitle")}</h1>
        <p className="text-body text-text-secondary">{isSignup ? t("signUpSubtitle") : t("signInSubtitle")}</p>
      </div>

      {/* Social */}
      <div className="flex gap-3">
        {["Google", "Apple"].map((p) => (
          <button
            key={p}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md border border-border-strong text-label text-text-primary"
          >
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-surface-muted text-label-xs">
              {p[0]}
            </span>
            <span>
              {t.rich("continueWith", {
                provider: p,
                desktop: (chunks) => <span className="hidden lg:inline">{chunks}</span>,
              })}
            </span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-body-sm text-text-muted">{t("orWithEmail")}</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {isSignup ? <SignUpForm /> : <SignInForm />}

      <div className="flex items-center justify-center gap-1.5">
        <span className="text-body text-text-secondary">
          {isSignup ? t("haveAccount") : t("newHere")}
        </span>
        <Link
          href={isSignup ? "/login" : "/register"}
          className="text-label text-brand-700 underline underline-offset-2"
        >
          {isSignup ? tCommon("signIn") : tCommon("createAccount")}
        </Link>
      </div>
    </AuthShell>
  );
}
