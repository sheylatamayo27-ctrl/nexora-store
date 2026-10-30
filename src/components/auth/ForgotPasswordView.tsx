"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MailCheck } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import { Button, ButtonLink } from "@/components/ui/Button";
import { notifyToast } from "@/lib/toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Recuperar contraseña. Solo front-end: valida el correo en el cliente y simula
 * el envío (no se manda nada a ningún sitio). Para conectarlo, cambia el bloque
 * marcado en `handleSubmit` por la llamada real (p. ej. POST /api/auth/forgot-password).
 */
export function ForgotPasswordView() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Escribe tu correo electrónico.");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setError("Escribe un correo válido, p. ej. nombre@correo.com.");
      return;
    }
    // Envío simulado: aquí iría la petición al backend.
    setSentTo(value);
    notifyToast({ title: "Te enviamos un enlace", description: "Revisa tu bandeja de entrada", icon: MailCheck });
  };

  if (sentTo) {
    return (
      <AuthShell variant="signin">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100">
          <MailCheck className="h-7 w-7 text-brand-800" />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-h2 text-text-primary">Revisa tu correo</h1>
          <p className="text-body text-text-secondary">
            Te enviamos un enlace a <span className="text-label text-text-primary">{sentTo}</span> para crear
            una contraseña nueva. Si no lo ves, revisa la carpeta de spam.
          </p>
        </div>

        <ButtonLink href="/login" variant="primary" size="lg" fullWidth icon className="justify-center">
          Volver a iniciar sesión
        </ButtonLink>

        <div className="flex items-center justify-center gap-1.5">
          <span className="text-body text-text-secondary">¿No es tu correo?</span>
          <button
            type="button"
            onClick={() => setSentTo(null)}
            className="text-label text-brand-700 underline underline-offset-2"
          >
            Usar otro
          </button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell variant="signin">
      <div className="flex flex-col gap-1">
        <h1 className="text-h2 text-text-primary">¿Olvidaste tu contraseña?</h1>
        <p className="text-body text-text-secondary">
          Escribe el correo de tu cuenta y te enviaremos un enlace para crear una nueva.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Correo electrónico"
          icon={Mail}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="nombre@correo.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          error={error !== null}
          aria-invalid={error !== null}
          helper={error ?? undefined}
        />
        <Button type="submit" variant="primary" size="lg" fullWidth icon className="justify-center">
          Enviar enlace
        </Button>
      </form>

      <div className="flex items-center justify-center gap-1.5">
        <span className="text-body text-text-secondary">¿La recordaste?</span>
        <Link href="/login" className="text-label text-brand-700 underline underline-offset-2">
          Iniciar sesión
        </Link>
      </div>
    </AuthShell>
  );
}
