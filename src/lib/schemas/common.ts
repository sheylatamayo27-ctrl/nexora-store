// zod/mini: la misma librería en su versión por funciones, que solo empaqueta lo
// que se usa (~5 kB gzip frente a ~39 kB de `zod` clásico en el bundle del login).
import { z } from "zod/mini";
import type { Messages } from "next-intl";

/** Clave de un texto de error en el namespace "validation" de messages/*.json. */
export type ValidationKey = keyof Messages["validation"];

/**
 * Los mensajes de error de los schemas son claves de "validation", no textos:
 * el formulario los traduce al idioma activo con `useErrorText()` (src/lib/forms.ts).
 * `key()` solo sirve para que una clave inventada no compile.
 */
export const key = (k: ValidationKey) => k;

/** Recorta espacios (el autocompletado del móvil suele añadir uno al final) y valida el formato. */
export const email = z.pipe(z.string().check(z.trim(), z.minLength(1, key("emailRequired"))), z.email(key("email")));

/** Teléfono: +, dígitos, espacios, guiones y paréntesis, con `minDigits` a 15 dígitos. */
export function isPhone(value: string, minDigits: number) {
  const digits = value.replace(/\D/g, "").length;
  return /^\+?[\d\s()-]+$/.test(value) && digits >= minDigits && digits <= 15;
}
