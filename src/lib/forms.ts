import { useTranslations } from "next-intl";
import type { FieldErrors, FieldValues } from "react-hook-form";
import type { ValidationKey } from "@/lib/schemas/common";

/**
 * Opciones comunes de `useForm`. Valida al salir de cada campo (y, tras el primer
 * envío, al escribir). El error de un campo aparece 300 ms después: si el blur
 * viene de un clic (en una casilla, en un enlace…), el mensaje empujaría el
 * contenido entre el mousedown y el mouseup y el clic se perdería. Al enviar,
 * los errores se muestran al instante.
 */
export const FORM_OPTIONS = { mode: "onBlur", delayError: 300 } as const;

/** Traduce la clave de error que devuelve zod (ver src/lib/schemas/). */
export function useErrorText() {
  const t = useTranslations("validation");
  return (message?: string) => (message ? t(message as ValidationKey) : undefined);
}

/**
 * Para `handleSubmit(onValid, focusFirstError)` en formularios largos (con
 * `shouldFocusError: false`): lleva el primer campo con error, en el orden de la
 * página, al centro de la pantalla y lo enfoca. Con el foco por defecto de
 * react-hook-form el campo queda pegado al borde y su etiqueta, fuera de vista.
 */
export function focusFirstError<T extends FieldValues>(errors: FieldErrors<T>) {
  const names = new Set(Object.keys(errors));
  const first = Array.from(document.querySelectorAll<HTMLElement>("form [name]")).find((el) =>
    names.has(el.getAttribute("name") ?? "")
  );
  if (!first) return;
  first.scrollIntoView({ block: "center" });
  first.focus({ preventScroll: true });
}
