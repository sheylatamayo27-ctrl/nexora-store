import { cn } from "@/lib/utils";

/** Marcador de carga con la forma de `ProductCard`: misma caja, imagen cuadrada y líneas de texto. */
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("flex flex-col overflow-hidden rounded-lg border border-border bg-surface p-2", className)}
    >
      <div className="aspect-square animate-pulse rounded-md bg-surface-subtle" />
      <div className="flex flex-1 flex-col gap-2 px-1 pb-1 pt-3">
        <div className="h-3 w-1/3 animate-pulse rounded bg-surface-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-surface-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-surface-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-surface-muted" />
        <div className="h-5 w-2/5 animate-pulse rounded bg-surface-muted" />
      </div>
    </div>
  );
}

/** `count` skeletons seguidos (para rellenar una grilla mientras carga). */
export function ProductCardSkeletons({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </>
  );
}
