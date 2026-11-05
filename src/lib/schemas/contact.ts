import { z } from "zod/mini";
import { email, key } from "@/lib/schemas/common";

/** Límite del mensaje: el contador del formulario lo muestra. */
export const CONTACT_MESSAGE_MAX = 2000;

export const contactSchema = z.object({
  name: z.string().check(z.trim(), z.minLength(1, key("firstName")), z.minLength(2, key("firstNameMin"))),
  email,
  subject: z.string().check(z.trim(), z.minLength(1, key("subjectRequired")), z.minLength(5, key("subjectMin"))),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, key("messageRequired")),
      z.minLength(20, key("messageMin")),
      z.maxLength(CONTACT_MESSAGE_MAX, key("messageMax"))
    ),
});

export type ContactData = z.infer<typeof contactSchema>;
