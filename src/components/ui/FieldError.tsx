import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/** Mensaje de error bajo un campo: ícono + texto en rojo, con aparición suave. */
export function FieldError({ id, message, className }: { id?: string; message: string; className?: string }) {
  return (
    <span
      id={id}
      role="alert"
      className={cn("flex items-start gap-1.5 text-body-sm text-sale-500 motion-safe:animate-fade-in", className)}
    >
      <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden />
      {message}
    </span>
  );
}
