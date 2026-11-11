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
import { Dots } from "@/components/ui/Dots";
import { Link, useRouter } from "@/i18n/navigation";
import { notifyToast } from "@/lib/toast";
import { FORM_OPTIONS, useErrorText } from "@/lib/forms";
import { loginSchema, registerSchema, type LoginData, type RegisterData } from "@/lib/schemas/auth";
import { AuthError, type AuthErrorCode, type AuthProvider } from "@/services/auth";
import { useAuth } from "@/store/auth";

const SIGNIN_DEFAULTS: LoginData = { email: "sheyla@nexora.store", password: "password123" };
const SIGNUP_DEFAULTS: RegisterData = {
  firstName: "Sheyla",
  lastName: "Tamayo",
  email: "sheyla@nexora.store",
  phone: "+52 55 9876 5432",
  password: "Password123",
  acceptTerms: true,
};

const AUTH_ERROR_KEYS = {
  invalid_credentials: "invalidCredentials",
  email_taken: "emailTaken",
  provider_cancelled: "providerCancelled",
} as const satisfies Record<AuthErrorCode, string>;

function useAuthFailureToast() {
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");
  return (title: string, error: unknown) =>
    notifyToast({
      tone: "error",
      icon: AlertCircle,
      title,
      description:
        error instanceof AuthError
          ? error.code
            ? t(`errors.${AUTH_ERROR_KEYS[error.code]}`)
            : error.message
          : tCommon("checkConnection"),
    });
}

/**
 * Inicio de sesión. Valida con zod (al salir de cada campo y al enviar) y entra
 * con `useAuth().login`, que llama al servicio de auth (src/services/auth.ts):
 * para conectar un backend real solo se cambia el servicio.
 */
function SignInForm() {
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");
  const errorText = useErrorText();
  const router = useRouter();
  const login = useAuth((s) => s.login);
  const failureToast = useAuthFailureToast();
  const [navigating, startNavigation] = useTransition();
  const [remember, setRemember] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema), defaultValues: SIGNIN_DEFAULTS, ...FORM_OPTIONS });

  const field = (name: keyof LoginData) => ({
    ...register(name),
    "aria-required": true,
    defaultValue: SIGNIN_DEFAULTS[name],
    error: errorText(errors[name]?.message),
  });

  const onSubmit = async ({ email, password }: LoginData) => {
    try {
      await login(email, password);
      notifyToast({ icon: UserCheck, title: t("welcomeBack") });
      startNavigation(() => router.push("/account"));
    } catch (error) {
      failureToast(t("signInFailed"), error);
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

function SignUpForm() {
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");
  const errorText = useErrorText();
  const router = useRouter();
  const registerUser = useAuth((s) => s.register);
  const failureToast = useAuthFailureToast();
  const [navigating, startNavigation] = useTransition();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema), defaultValues: SIGNUP_DEFAULTS, ...FORM_OPTIONS });

  const field = (name: Exclude<keyof RegisterData, "acceptTerms">) => ({
    ...register(name),
    "aria-required": name !== "phone",
    defaultValue: SIGNUP_DEFAULTS[name],
    error: errorText(errors[name]?.message),
  });

  const onSubmit = async ({ firstName, lastName, email, password }: RegisterData) => {
    try {
      await registerUser({ name: `${firstName.trim()} ${lastName.trim()}`.trim(), email, password });
      notifyToast({ icon: UserCheck, title: t("accountCreated"), description: t("accountCreatedDescription") });
      startNavigation(() => router.push("/account"));
    } catch (error) {
      failureToast(t("signUpFailed"), error);
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

const PROVIDERS: { id: AuthProvider; name: string }[] = [
  { id: "google", name: "Google" },
  { id: "apple", name: "Apple" },
];

function SocialSignIn() {
  const t = useTranslations("auth");
  const router = useRouter();
  const loginWithProvider = useAuth((s) => s.loginWithProvider);
  const failureToast = useAuthFailureToast();
  const [, startNavigation] = useTransition();
  const [pending, setPending] = useState<AuthProvider | null>(null);

  const signIn = async ({ id, name }: (typeof PROVIDERS)[number]) => {
    setPending(id);
    try {
      await loginWithProvider(id);
      notifyToast({ icon: UserCheck, title: t("signedInWith", { provider: name }) });
      startNavigation(() => router.push("/account"));
    } catch (error) {
      setPending(null);
      failureToast(t("signInFailed"), error);
    }
  };

  return (
    <div className="flex gap-3">
      {PROVIDERS.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => signIn(p)}
          disabled={pending !== null}
          aria-busy={pending === p.id || undefined}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md border border-border-strong text-label text-text-primary disabled:cursor-not-allowed"
        >
          {pending === p.id ? (
            <Dots size="sm" />
          ) : (
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-surface-muted text-label-xs">
              {p.name[0]}
            </span>
          )}
          <span>
            {t.rich("continueWith", {
              provider: p.name,
              desktop: (chunks) => <span className="hidden lg:inline">{chunks}</span>,
            })}
          </span>
        </button>
      ))}
    </div>
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

      <SocialSignIn />
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
