import { cn } from "@/lib/utils";

type Variant = "text" | "title" | "image" | "circle" | "button";

const variants: Record<Variant, string> = {
  text: "h-4 rounded-md",
  title: "h-6 rounded-md",
  image: "aspect-square rounded-lg",
  circle: "rounded-full",
  button: "h-11 rounded-md",
};

/**
 * Bloque gris con un brillo que lo recorre de izquierda a derecha (keyframe
 * `shimmer`): imita un contenido mientras carga. `width` es una clase de ancho de
 * Tailwind (`w-full`, `w-32`…); cualquier otra medida va en `className`.
 * Es decorativo (`aria-hidden`): el aviso "Cargando" lo da `SkeletonRegion`.
 */
export function Skeleton({
  variant,
  width,
  className,
}: {
  variant?: Variant;
  width?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-md bg-border",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent motion-reduce:before:hidden",
        variant && variants[variant],
        width,
        className,
      )}
    />
  );
}
