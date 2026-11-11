import { couponFreeShipping } from "@/lib/coupons";

export const SHIPPING_RATES = { standard: 0, express: 4.99, sameday: 8.99 } as const;

export type ShippingMethod = keyof typeof SHIPPING_RATES;

export const FREE_EXPRESS_THRESHOLD = 500;

export const DEFAULT_SHIPPING_METHOD: ShippingMethod = "express";

export function shippingCost(method: ShippingMethod, subtotal: number, coupon?: string): number {
  if (couponFreeShipping(coupon)) return 0;
  if (method === "express" && subtotal >= FREE_EXPRESS_THRESHOLD) return 0;
  return SHIPPING_RATES[method];
}

export function freeExpressProgress(subtotal: number) {
  return {
    remaining: Math.max(0, FREE_EXPRESS_THRESHOLD - subtotal),
    percent: Math.min(100, (subtotal / FREE_EXPRESS_THRESHOLD) * 100),
  };
}
