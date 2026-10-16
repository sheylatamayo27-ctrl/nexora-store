"use client";

import Link from "next/link";
import { Mail, Lock, Phone, ChevronLeft, Star, Check } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { AssetImage } from "@/components/media/AssetImage";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { ButtonLink } from "@/components/ui/Button";

const perks = ["Precios de miembro", "Envío gratis en tu primer pedido", "Acceso anticipado a ofertas"];

export function AuthView({ mode }: { mode: "signin" | "signup" }) {
  const isSignup = mode === "signup";

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Panel de marca */}
      <div className="relative flex min-h-[220px] flex-col justify-between overflow-hidden p-6 lg:min-h-screen lg:w-[46%] lg:p-10">
        <AssetImage
          folder={isSignup ? "banners" : "misc"}
          name={isSignup ? "tablet-banner" : "hero"}
          alt="Nexora"
          priority
          sizes="(max-width: 1024px) 100vw, 46vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061234]/90 via-[#061234]/40 to-[#061234]/50" />

        <div className="relative flex items-center justify-between">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-text-inverse"
            aria-label="Volver a la tienda"
          >
            <ChevronLeft className="h-[18px] w-[18px]" />
          </Link>
          <Logo tone="light" href={null} />
          <span className="w-9" />
        </div>

        <div className="relative flex flex-col gap-4 text-text-inverse">
          <h2 className="max-w-md text-h3 lg:text-h2">
            {isSignup
              ? "Únete a Nexora y desbloquea beneficios de miembro"
              : "Tecnología que te encantará, entregada mañana"}
          </h2>
          {isSignup ? (
            <div className="flex flex-col gap-2">
              {perks.map((p) => (
                <span key={p} className="flex items-center gap-2 text-body-lg text-white/90">
                  <Check className="h-4 w-4 text-accent-500" /> {p}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent-500 text-accent-500" />
                ))}
              </div>
              <span className="text-body text-white/85">4.9 de más de 50 mil clientes</span>
            </div>
          )}
        </div>
      </div>

      {/* Formulario */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <div className="flex w-full max-w-md flex-col gap-5">
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
                {p}
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
          <Input label="Contraseña" icon={Lock} type="password" defaultValue="password123" />

          {isSignup ? (
            <Checkbox checked onChange={() => {}} label="Acepto los Términos y la Política de Privacidad" />
          ) : (
            <div className="flex items-center justify-between">
              <Checkbox checked onChange={() => {}} label="Recordarme" />
              <Link href="#" className="text-label text-brand-700">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          )}

          <ButtonLink href="/cuenta" variant="primary" size="lg" fullWidth className="justify-center">
            {isSignup ? "Crear cuenta" : "Iniciar sesión"}
          </ButtonLink>

          <div className="flex items-center justify-center gap-1.5">
            <span className="text-body text-text-secondary">
              {isSignup ? "¿Ya tienes cuenta?" : "¿Nueva en Nexora?"}
            </span>
            <Link
              href={isSignup ? "/entrar" : "/crear-cuenta"}
              className="text-label text-brand-700 underline underline-offset-2"
            >
              {isSignup ? "Iniciar sesión" : "Crear cuenta"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
