import { Button } from "@/components/ui/Button";
import { Dots } from "@/components/ui/Dots";
import { cn } from "@/lib/utils";

/**
 * Botón de envío de formulario (primario, grande, a todo el ancho). Con `busy`
 * queda deshabilitado y muestra puntos y `busyLabel` en lugar de su texto.
 */
export function SubmitButton({
  busy,
  busyLabel,
  icon = false,
  className,
  children,
}: {
  busy: boolean;
  busyLabel: string;
  /** Chevron a la derecha del texto (se oculta mientras envía). */
  icon?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      fullWidth
      icon={icon && !busy}
      disabled={busy}
      aria-busy={busy || undefined}
      className={cn("justify-center disabled:opacity-80", className)}
    >
      {busy ? (
        <>
          <Dots size="sm" tone="inverse" />
          {busyLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
