"use client";

import { useState } from "react";
import { Mail, Lock, Phone, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { ButtonLink } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

export function AuthView({ mode }: { mode: "signin" | "signup" }) {
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");
  const isSignup = mode === "signup";
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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

      {isSignup && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label={tCommon("fields.firstName")} defaultValue="Sheyla" />
          <Input label={tCommon("fields.lastName")} defaultValue="Tamayo" />
        </div>
      )}
      <Input label={tCommon("fields.email")} icon={Mail} defaultValue="sheyla@nexora.store" />
      {isSignup && <Input label={tCommon("fields.phone")} icon={Phone} defaultValue="+52 55 9876 5432" />}
      <Input
        label={tCommon("fields.password")}
        icon={showPassword ? Eye : Lock}
        onIconClick={() => setShowPassword((v) => !v)}
        iconLabel={showPassword ? t("hidePassword") : t("showPassword")}
        type={showPassword ? "text" : "password"}
        defaultValue="password123"
      />

      {isSignup ? (
        <Checkbox checked onChange={() => {}} label={t("acceptTerms")} />
      ) : (
        <div className="flex items-center justify-between">
          <Checkbox checked={remember} onChange={setRemember} label={t("rememberMe")} />
          <Link href="/forgot-password" className="text-label text-brand-700">
            {t("forgotPassword")}
          </Link>
        </div>
      )}

      <ButtonLink href="/account" variant="primary" size="lg" fullWidth icon className="justify-center">
        {isSignup ? tCommon("createAccount") : tCommon("signIn")}
      </ButtonLink>

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
