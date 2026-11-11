import { z } from "zod/mini";
import { email, key } from "@/lib/schemas/common";

export const trackingSchema = z.object({
  orderNumber: z.pipe(
    z.string().check(z.trim(), z.minLength(1, key("orderNumberRequired")), z.minLength(5, key("orderNumberMin"))),
    z.transform((v) => v.toUpperCase())
  ),
  email,
});

export type TrackingInput = z.input<typeof trackingSchema>;
export type TrackingData = z.output<typeof trackingSchema>;
