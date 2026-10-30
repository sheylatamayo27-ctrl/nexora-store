"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Phone, Eye } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { ButtonLink } from "@/components/ui/Button";

export function AuthView({ mode }: { mode: "signin" | "signup" }) {
  const isSignup = mode === "signup";
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell variant={mode}>
      <div className="flex flex-col gap-1">
        <h1 className="text-h2 text-text-primary">
          {isSignup ? "Crea tu cuenta" : "Bienvenida de vuelta"}
        </h1>
        <p className="text-body text-text-secondary">
          {isSignup
            ? "Toma menos de un minuto."
            : "Inicia sesión para rastrear pedidos y pagar más rápido."}
        </p>
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
              <span className="hidden lg:inline">Continuar con </span>
              {p}
            </span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-body-sm text-text-muted">o con tu correo</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {isSignup && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Nombre" defaultValue="Sheyla" />
          <Input label="Apellidos" defaultValue="Tamayo" />
        </div>
      )}
      <Input label="Correo electrónico" icon={Mail} defaultValue="sheyla@nexora.store" />
      {isSignup && <Input label="Teléfono" icon={Phone} defaultValue="+52 55 9876 5432" />}
      <Input
        label="Contraseña"
        icon={showPassword ? Eye : Lock}
        onIconClick={() => setShowPassword((v) => !v)}
        iconLabel={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        type={showPassword ? "text" : "password"}
        defaultValue="password123"
      />

      {isSignup ? (
        <Checkbox checked onChange={() => {}} label="Acepto los Términos y la Política de Privacidad" />
      ) : (
        <div className="flex items-center justify-between">
          <Checkbox checked={remember} onChange={setRemember} label="Recordarme" />
          <Link href="/forgot-password" className="text-label text-brand-700">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      )}

      <ButtonLink href="/account" variant="primary" size="lg" fullWidth icon className="justify-center">
        {isSignup ? "Crear cuenta" : "Iniciar sesión"}
      </ButtonLink>

      <div className="flex items-center justify-center gap-1.5">
        <span className="text-body text-text-secondary">
          {isSignup ? "¿Ya tienes cuenta?" : "¿Nueva en Nexora?"}
        </span>
        <Link
          href={isSignup ? "/login" : "/register"}
          className="text-label text-brand-700 underline underline-offset-2"
        >
          {isSignup ? "Iniciar sesión" : "Crear cuenta"}
        </Link>
      </div>
    </AuthShell>
  );
}
