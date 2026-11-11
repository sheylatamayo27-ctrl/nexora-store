import { z } from "zod/mini";
import type { Messages } from "next-intl";

export type ValidationKey = keyof Messages["validation"];

export const key = (k: ValidationKey) => k;

export const email = z.pipe(z.string().check(z.trim(), z.minLength(1, key("emailRequired"))), z.email(key("email")));

export function isPhone(value: string, minDigits: number) {
  const digits = value.replace(/\D/g, "").length;
  return /^\+?[\d\s()-]+$/.test(value) && digits >= minDigits && digits <= 15;
}
