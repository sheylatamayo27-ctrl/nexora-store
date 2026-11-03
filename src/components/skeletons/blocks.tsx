import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

/*
 * Piezas de las pantallas de carga (`loading.tsx`). Copian las medidas de los
 * componentes reales para que, al llegar el contenido, la página no salte.
 * Estilos de móvil/tablet solo con `max-*`: la base es la de escritorio.
 */

/** Skeleton sobre fondo oscuro (hero, panel de marca). */
export const onDark = "bg-white/10 before:via-white/10";

/** Envoltorio de una pantalla de carga: anuncia "Cargando" a los lectores de pantalla. */
export function SkeletonRegion({ children, className }: { children: ReactNode; className?: string }) {
  const t = useTranslations("common");
  return (
    <div role="status" aria-busy="true" className={className}>
      <span className="sr-only">{t("loading")}</span>
      {children}
    </div>
  );
}

/** Misma caja que `ProductCard`: imagen, marca, nombre en dos líneas, precio y estrellas. */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col rounded-lg border border-border bg-surface p-2", className)}>
      <Skeleton variant="image" className="rounded-md" />
      <div className="flex flex-col gap-1.5 px-1 pb-1 pt-3">
        <Skeleton className="h-4" width="w-1/3" />
        <Skeleton className="h-5" width="w-full" />
        <Skeleton className="h-5" width="w-2/3" />
        <Skeleton className="h-5" width="w-2/5" />
        <Skeleton className="h-4" width="w-1/2" />
      </div>
    </div>
  );
}

/**
 * `count` tarjetas. `hide` oculta las sobrantes según el tamaño: `{ 3: "max-lg:hidden" }`
 * oculta de la cuarta en adelante por debajo de 1024px.
 */
export function CardSkeletons({ count, hide = {} }: { count: number; hide?: Record<number, string> }) {
  const classFor = (i: number) =>
    Object.entries(hide)
      .filter(([from]) => i >= Number(from))
      .map(([, cls]) => cls)
      .join(" ");
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} className={classFor(i)} />
      ))}
    </>
  );
}

/** Migas de pan: inicio + dos niveles. */
export function BreadcrumbSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

/** Franja blanca de cabecera (categoría, blog, búsqueda): migas, título grande y descripción. */
export function PageHeaderSkeleton({ children }: { children?: ReactNode }) {
  return (
    <div className="bg-surface">
      <Container className="flex flex-col gap-5 py-8">
        <BreadcrumbSkeleton />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-12 w-80 max-w-full max-sm:h-9 max-sm:w-56" />
          <Skeleton variant="text" className="w-[30rem] max-w-full max-sm:w-64" />
        </div>
        {children}
      </Container>
    </div>
  );
}

/** Cabecera de sección (`SectionHeader`): título, subtítulo y enlace "Ver todo". */
export function SectionHeaderSkeleton({ subtitle = true, link = true }: { subtitle?: boolean; link?: boolean }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Skeleton className="h-9 w-72 max-w-full max-sm:h-7 max-sm:w-52" />
        {subtitle && <Skeleton variant="text" className="w-96 max-w-full max-sm:w-60" />}
      </div>
      {link && <Skeleton className="h-5 w-20 shrink-0" />}
    </div>
  );
}

/** Tarjeta de resumen del pedido (carrito y pago): líneas de productos, importes, total y botón. */
export function OrderSummarySkeleton({ items = 0, coupon = false, cta = false }: { items?: number; coupon?: boolean; cta?: boolean }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <Skeleton variant="title" className="w-40" />
        {items > 0 && <Skeleton className="h-4 w-12" />}
      </div>
      {Array.from({ length: items }, (_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-14 w-14 shrink-0" />
          <Skeleton variant="text" className="flex-1" />
          <Skeleton variant="text" className="w-20 shrink-0" />
        </div>
      ))}
      {items > 0 && <div className="h-px bg-border" />}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex justify-between">
          <Skeleton variant="text" className={i % 2 ? "w-24" : "w-36"} />
          <Skeleton variant="text" className="w-20" />
        </div>
      ))}
      <div className="h-px bg-border" />
      <div className="flex items-center justify-between">
        <Skeleton variant="title" className="w-16" />
        <Skeleton className="h-8 w-36" />
      </div>
      {coupon && (
        <div className="flex gap-3">
          <Skeleton variant="button" className="flex-1" />
          <Skeleton variant="button" className="w-20" />
        </div>
      )}
      {cta && <Skeleton className="h-14" width="w-full" />}
    </div>
  );
}

/**
 * Marco de "Mi cuenta" (`AccountShell`): en escritorio, columna con perfil y menú;
 * en móvil/tablet, franja blanca con el perfil en fila y las pestañas en horizontal.
 */
export function AccountShellSkeleton({ children }: { children: ReactNode }) {
  return (
    <Container className="flex gap-8 py-8 max-lg:flex-col max-lg:gap-6">
      <aside className="flex w-72 shrink-0 flex-col gap-4 max-lg:hidden">
        <BreadcrumbSkeleton />
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-6">
          <Skeleton variant="circle" className="h-[72px] w-[72px]" />
          <Skeleton variant="text" className="w-32" />
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-6 w-24 rounded-sm" />
        </div>
        <div className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-3">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <Skeleton className="h-5 w-5 shrink-0" />
              <Skeleton variant="text" className={i % 2 ? "w-28" : "w-24"} />
            </div>
          ))}
          <div className="my-1 h-px bg-border" />
          <div className="flex items-center gap-3 px-4 py-3">
            <Skeleton className="h-5 w-5 shrink-0" />
            <Skeleton variant="text" className="w-24" />
          </div>
        </div>
      </aside>

      <div className="hidden flex-col gap-4 border-b border-border bg-surface max-lg:-mx-6 max-lg:-mt-8 max-lg:flex max-lg:px-6 max-lg:py-4 max-sm:-mx-4 max-sm:px-4">
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" className="h-14 w-14 shrink-0 max-md:h-12 max-md:w-12" />
          <div className="flex flex-col gap-2">
            <Skeleton variant="text" className="w-40" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="flex gap-2 overflow-hidden">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-28 shrink-0" />
          ))}
        </div>
      </div>

      <div className="min-w-0 flex-1">{children}</div>
    </Container>
  );
}

/**
 * Pantalla de acceso (`AuthShell`): panel de marca oscuro a la izquierda (en móvil,
 * franja arriba) y el formulario con `fields` filas de campos. El panel de registro
 * (`benefits`) lleva titular y ventajas; el de acceso, testimonio y cifras.
 * `pairFirst`: la primera fila tiene dos campos (nombre y apellidos).
 */
export function AuthSkeleton({
  fields,
  social = true,
  panel = "testimonial",
  pairFirst = false,
}: {
  fields: number;
  social?: boolean;
  panel?: "testimonial" | "benefits";
  pairFirst?: boolean;
}) {
  const field = (key: number) => (
    <div key={key} className="flex flex-col gap-2">
      <Skeleton variant="text" className="w-32" />
      <Skeleton className="h-12" width="w-full" />
    </div>
  );
  return (
    <SkeletonRegion className="flex min-h-screen max-lg:flex-col">
      <div className="flex min-h-screen w-[46%] flex-col justify-between bg-brand-900 p-10 max-lg:min-h-[220px] max-lg:w-full max-lg:p-6">
        <Skeleton className={cn("h-9 w-32", onDark)} />
        {panel === "benefits" ? (
          <div className="flex flex-col gap-4 max-lg:pt-6">
            <div className="flex flex-col gap-2">
              <Skeleton className={cn("h-9 w-80 max-w-full max-lg:h-7", onDark)} />
              <Skeleton className={cn("h-9 w-56 max-lg:h-7", onDark)} />
            </div>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className={cn("h-4 w-48", onDark)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 rounded-xl border border-white/15 p-6 max-lg:hidden">
              <Skeleton className={cn("h-4 w-24", onDark)} />
              <Skeleton variant="text" className={cn("w-full", onDark)} />
              <Skeleton variant="text" className={cn("w-4/5", onDark)} />
              <div className="flex items-center gap-3 pt-1">
                <Skeleton variant="circle" className={cn("h-9 w-9", onDark)} />
                <Skeleton className={cn("h-3 w-28", onDark)} />
              </div>
            </div>
            <div className="flex justify-between max-lg:hidden">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className={cn("h-10 w-20", onDark)} />
              ))}
            </div>
            <div className="hidden flex-col gap-3 max-lg:flex">
              <Skeleton className={cn("h-7 w-64 max-w-full", onDark)} />
              <Skeleton className={cn("h-4 w-48", onDark)} />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 items-center justify-center px-10 pb-10 pt-10 max-lg:items-start max-sm:px-6 max-sm:pb-6 max-sm:pt-8">
        <div className="flex w-full min-w-0 max-w-md flex-col gap-5">
          <Skeleton className="h-5 w-32 max-lg:hidden" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-64 max-w-full" />
            <Skeleton variant="text" className="w-72 max-w-full" />
          </div>
          {social && (
            <>
              <div className="flex gap-3">
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 flex-1" />
              </div>
              <Skeleton className="mx-auto h-3 w-24" />
            </>
          )}
          {Array.from({ length: fields }, (_, i) =>
            i === 0 && pairFirst ? (
              <div key={i} className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                {field(0)}
                {field(1)}
              </div>
            ) : (
              field(i)
            ),
          )}
          {social && (
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-36" />
            </div>
          )}
          <Skeleton className="h-14" width="w-full" />
          <Skeleton variant="text" className="mx-auto w-48" />
        </div>
      </div>
    </SkeletonRegion>
  );
}
