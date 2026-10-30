import Link from "next/link";
import { ChevronLeft, Star, Check } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { AssetImage } from "@/components/media/AssetImage";

const perks = ["Precios de miembro", "Envío gratis en tu primer pedido", "Acceso anticipado a ofertas"];

const stats = [
  { value: "50k+", label: "Clientes felices" },
  { value: "4.9★", label: "Valoración media" },
  { value: "24h", label: "Entrega exprés" },
];

/**
 * Marco de las pantallas de acceso: panel de marca y columna del formulario
 * con "Volver a la tienda". El formulario de cada pantalla va en `children`.
 */
export function AuthShell({ variant, children }: { variant: "signin" | "signup"; children: React.ReactNode }) {
  const isSignup = variant === "signup";

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Panel de marca */}
      <div className="relative flex min-h-[220px] flex-col justify-between overflow-hidden p-6 lg:min-h-screen lg:w-[46%] lg:p-10">
        {isSignup ? (
          <AssetImage
            folder="banners"
            name="tablet-banner"
            alt="Nexora"
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
          />
        ) : (
          <>
            {/* Móvil/tablet: imagen original del panel (sin cambios). */}
            <AssetImage
              folder="misc"
              name="hero"
              alt="Nexora"
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="lg:hidden"
            />
            {/* Escritorio: imagen vertical con los audífonos completos y centrados (07). */}
            <AssetImage
              folder="misc"
              name="auth-panel"
              alt="Nexora"
              priority
              sizes="50vw"
              className="hidden object-[center_35%] lg:block"
            />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061234]/90 via-[#061234]/40 to-[#061234]/50" />

        <div className="relative flex items-center justify-between lg:justify-start">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-text-inverse lg:hidden"
            aria-label="Volver a la tienda"
          >
            <ChevronLeft className="h-[18px] w-[18px]" />
          </Link>
          {/* Móvil/tablet: volver a la izquierda y logo en la esquina superior
              derecha (justify-between). Escritorio: solo el logo, a la izquierda. */}
          <Logo tone="light" href={null} />
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
                <figure className="flex flex-col gap-4 rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
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
                <div className="flex items-center justify-between">
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

      {/* Formulario — en <lg se alinea arriba (max-lg:items-start) para no dejar
          un hueco grande por el centrado vertical; separación ~32px móvil /
          ~40px tablet. Escritorio (≥lg) centrado e intacto (padding = p-10). */}
      <div className="flex flex-1 items-center justify-center px-6 pb-6 pt-8 max-lg:items-start sm:px-10 sm:pb-10 sm:pt-10">
        <div className="flex w-full min-w-0 max-w-md flex-col gap-5">
          <Link
            href="/"
            className="hidden items-center gap-1 text-label text-text-secondary transition-colors hover:text-text-primary lg:flex"
          >
            <ChevronLeft className="h-4 w-4" /> Volver a la tienda
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
