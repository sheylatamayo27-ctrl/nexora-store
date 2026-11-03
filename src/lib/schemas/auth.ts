// zod/mini: la misma librería en su versión por funciones, que solo empaqueta lo
// que se usa (~5 kB gzip frente a ~39 kB de `zod` clásico en el bundle del login).
import { z } from "zod/mini";
import type { Messages } from "next-intl";

/** Clave de un texto de error en el namespace "validation" de messages/*.json. */
export type ValidationKey = keyof Messages["validation"];

/**
 * Los mensajes de error de los schemas son claves de "validation", no textos:
 * el formulario los traduce al idioma activo con `useTranslations("validation")`.
 * `key()` solo sirve para que una clave inventada no compile.
 */
const key = (k: ValidationKey) => k;

/** Recorta espacios (el autocompletado del móvil suele añadir uno al final) y valida el formato. */
const email = z.pipe(z.string().check(z.trim(), z.minLength(1, key("emailRequired"))), z.email(key("email")));

export const loginSchema = z.object({
  email,
  password: z.string().check(z.minLength(1, key("passwordRequired")), z.minLength(6, key("passwordMin"))),
});

export const registerSchema = z.object({
  firstName: z.string().check(z.trim(), z.minLength(1, key("firstName")), z.minLength(2, key("firstNameMin"))),
  lastName: z.string().check(z.trim(), z.minLength(1, key("lastName")), z.minLength(2, key("lastNameMin"))),
  email,
  /** Opcional, como en Configuración; si se escribe, de 8 a 15 dígitos (admite +, espacios, guiones y paréntesis). */
  phone: z
    .string()
    .check(
      z.trim(),
      z.refine((v) => v === "" || (/^\+?[\d\s()-]+$/.test(v) && /^\d{8,15}$/.test(v.replace(/\D/g, ""))), key("phone"))
    ),
  password: z
    .string()
    .check(
      z.minLength(1, key("passwordRequired")),
      z.minLength(8, key("passwordStrong")),
      z.regex(/\p{Lu}/u, key("passwordStrong")),
      z.regex(/\d/, key("passwordStrong"))
    ),
  acceptTerms: z.boolean().check(z.refine((v) => v, key("acceptTerms"))),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
