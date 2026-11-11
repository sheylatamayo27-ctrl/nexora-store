import { z } from "zod/mini";
import { email, isPhone, key, type ValidationKey } from "@/lib/schemas/common";

export const SHIPPING_METHODS = ["standard", "express", "sameday"] as const;
export const PAYMENT_METHODS = ["card", "upi", "bank", "cod"] as const;

const CARD_NUMBER = /^(3[47]\d{13}|\d{16})$/;
const CARD_EXPIRY = /^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/;

function isExpired(month: number, year: number) {
  const now = new Date();
  const current = now.getFullYear() * 12 + now.getMonth() + 1;
  return (2000 + year) * 12 + month < current;
}

export const checkoutSchema = z
  .object({
    email,
    newsletter: z.boolean(),
    phone: z
      .string()
      .check(z.trim(), z.minLength(1, key("phoneRequired")), z.refine((v) => v === "" || isPhone(v, 10), key("phoneDigits"))),
    firstName: z.string().check(z.trim(), z.minLength(1, key("firstName")), z.minLength(2, key("firstNameMin"))),
    lastName: z.string().check(z.trim(), z.minLength(1, key("lastName")), z.minLength(2, key("lastNameMin"))),
    address: z.string().check(z.trim(), z.minLength(5, key("address"))),
    apartment: z.optional(z.string().check(z.trim())),
    city: z.string().check(z.trim(), z.minLength(2, key("city"))),
    state: z.string().check(z.minLength(1, key("state"))),
    postalCode: z.string().check(z.trim(), z.regex(/^\d{5}$/, key("postalCode"))),
    country: z.string().check(z.minLength(1, key("country"))),
    shippingMethod: z.enum(SHIPPING_METHODS, key("shippingMethod")),
    paymentMethod: z.enum(PAYMENT_METHODS),
    cardNumber: z.optional(z.string()),
    cardExpiry: z.optional(z.string()),
    cardCvc: z.optional(z.string()),
    cardName: z.optional(z.string()),
  })
  .check(
    z.superRefine((data, ctx) => {
      if (data.paymentMethod !== "card") return;
      const fail = (path: "cardNumber" | "cardExpiry" | "cardCvc" | "cardName", message: ValidationKey) =>
        ctx.addIssue({ code: "custom", path: [path], message });

      if (!CARD_NUMBER.test((data.cardNumber ?? "").replace(/[\s-]/g, ""))) fail("cardNumber", "cardNumber");

      const expiry = CARD_EXPIRY.exec((data.cardExpiry ?? "").trim());
      if (!expiry) fail("cardExpiry", "cardExpiry");
      else if (isExpired(Number(expiry[1]), Number(expiry[2]))) fail("cardExpiry", "cardExpired");

      if (!/^\d{3,4}$/.test((data.cardCvc ?? "").trim())) fail("cardCvc", "cardCvc");
      if ((data.cardName ?? "").trim().length < 3) fail("cardName", "cardName");
    })
  );

export type CheckoutData = z.infer<typeof checkoutSchema>;
