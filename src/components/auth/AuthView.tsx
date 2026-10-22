"use client";

import Link from "next/link";
import { Mail, Lock, Phone, ChevronLeft, Star, Check } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { AssetImage } from "@/components/media/AssetImage";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { ButtonLink } from "@/components/ui/Button";

const perks = ["Precios de miembro", "Envío gratis en tu primer pedido", "Acceso anticipado a ofertas"];

const stats = [
  { value: "50k+", label: "Clientes felices" },
  { value: "4.9★", label: "Valoración media" },
  { value: "24h", label: "Entrega exprés" },
];

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

        <div className="relative flex items-center justify-between lg:justify-start">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-text-inverse lg:hidden"
            aria-label="Volver a la tienda"
          >
            <ChevronLeft className="h-[18px] w-[18px]" />
          </Link>
          <Logo tone="light" href={null} />
          <span className="w-9 lg:hidden" />
        </div>

        <div className="relative flex flex-col gap-6 text-text-inverse">
          {isSignup ? (
            <>
              <h2 className="max-w-md text-h3 lg:text-h2">
                Únete a Nexora y desbloquea beneficios de miembro
              </h2>
              <div className="flex flex-col gap-2">
                {perks.map((p) => (
                  <span key={p} className="flex items-center gap-2 text-body-lg text-white/90">
                    <Check className="h-4 w-4 text-accent-500" /> {p}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Móvil: titular + valoración (como en Figma móvil) */}
              <div className="flex flex-col gap-4 lg:hidden">
                <h2 className="max-w-md text-h3">Tecnología que te encantará, entregada mañana</h2>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent-500 text-accent-500" />
                    ))}
                  </div>
                  <span className="text-body text-white/85">4.9 de más de 50 mil clientes</span>
                </div>
              </div>

              {/* Escritorio: testimonio + métricas (como en Figma desktop) */}
              <div className="hidden flex-col gap-8 lg:flex">
                <figure className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent-500 text-accent-500" />
                    ))}
                  </div>
                  <blockquote className="text-body-lg text-white/90">
                    “El mejor lugar para comprar tecnología online. Productos genuinos, entrega al
                    día siguiente y un equipo de soporte que de verdad ayuda.”
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-label-sm text-text-inverse">
                      AM
                    </span>
                    <span className="flex flex-col">
                      <span className="text-label text-text-inverse">Aarav Mehta</span>
                      <span className="text-body-sm text-white/70">Cliente desde 2023</span>
                    </span>
                  </figcaption>
                </figure>
                <div className="flex items-center gap-8">
                  {stats.map((s) => (
                    <div key={s.label} className="flex flex-col gap-0.5">
                      <span className="text-h3 text-text-inverse">{s.value}</span>
                      <span className="text-body-sm text-white/70">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Formulario */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <div className="flex w-full min-w-0 max-w-md flex-col gap-5">
          <Link
            href="/"
            className="hidden items-center gap-1 text-label text-text-secondary transition-colors hover:text-text-primary lg:flex"
          >
            <ChevronLeft className="h-4 w-4" /> Volver a la tienda
          </Link>
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

          <ButtonLink href="/cuenta" variant="primary" size="lg" fullWidth icon className="justify-center">
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
