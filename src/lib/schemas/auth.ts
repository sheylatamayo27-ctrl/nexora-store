import { z } from "zod/mini";
import { email, isPhone, key } from "@/lib/schemas/common";

export const loginSchema = z.object({
  email,
  password: z.string().check(z.minLength(1, key("passwordRequired")), z.minLength(6, key("passwordMin"))),
});

export const registerSchema = z.object({
  firstName: z.string().check(z.trim(), z.minLength(1, key("firstName")), z.minLength(2, key("firstNameMin"))),
  lastName: z.string().check(z.trim(), z.minLength(1, key("lastName")), z.minLength(2, key("lastNameMin"))),
  email,
  /** Opcional, como en Configuración; si se escribe, de 8 a 15 dígitos. */
  phone: z.string().check(z.trim(), z.refine((v) => v === "" || isPhone(v, 8), key("phone"))),
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
