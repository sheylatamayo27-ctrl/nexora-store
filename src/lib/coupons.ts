/**
 * Cupones de demo mientras la tienda no tenga backend. Para conectarlo, cambia
 * `findCoupon` por la validación real (p. ej. POST /api/coupons/validate).
 */
export type Coupon =
  | { code: string; kind: "percent"; percent: number }
  | { code: string; kind: "freeShipping" };

const COUPONS: Coupon[] = [
  { code: "NEXORA10", kind: "percent", percent: 10 },
  { code: "ENVIOGRATIS", kind: "freeShipping" },
];

export function findCoupon(code: string | undefined): Coupon | undefined {
  const normalized = code?.trim().toUpperCase();
  return normalized ? COUPONS.find((c) => c.code === normalized) : undefined;
}

export function couponDiscount(code: string | undefined, subtotal: number): number {
  const coupon = findCoupon(code);
  return coupon?.kind === "percent" ? Math.round(subtotal * coupon.percent) / 100 : 0;
}

export function couponFreeShipping(code: string | undefined): boolean {
  return findCoupon(code)?.kind === "freeShipping";
}
