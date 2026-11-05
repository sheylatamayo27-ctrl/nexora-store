import { couponFreeShipping } from "@/lib/coupons";

/*
 * Regla de envío de la tienda: el ÚNICO lugar que la conoce. La usan el carrito
 * (resumen y barra de progreso), el checkout, la confirmación del pedido y los
 * textos que mencionan importes, así no pueden contradecirse. Importes en USD.
 *
 *  - Estándar (3–5 días hábiles): siempre gratis.
 *  - Exprés (1–2 días hábiles): $4.99; gratis desde FREE_EXPRESS_THRESHOLD.
 *  - Mismo día (solo CDMX): $8.99, siempre.
 *  - El cupón ENVIOGRATIS deja gratis cualquier método.
 */
export const SHIPPING_RATES = { standard: 0, express: 4.99, sameday: 8.99 } as const;

export type ShippingMethod = keyof typeof SHIPPING_RATES;

/** Subtotal desde el que el envío exprés es gratis. */
export const FREE_EXPRESS_THRESHOLD = 500;

/** Método preseleccionado en el checkout; el carrito estima el envío con él. */
export const DEFAULT_SHIPPING_METHOD: ShippingMethod = "express";

/** Costo de envío de un pedido según el método, el subtotal (sin impuestos) y el cupón. */
export function shippingCost(method: ShippingMethod, subtotal: number, coupon?: string): number {
  if (couponFreeShipping(coupon)) return 0;
  if (method === "express" && subtotal >= FREE_EXPRESS_THRESHOLD) return 0;
  return SHIPPING_RATES[method];
}

/** Lo que falta para el exprés gratis (0 si ya se alcanzó) y el avance de 0 a 100. */
export function freeExpressProgress(subtotal: number) {
  return {
    remaining: Math.max(0, FREE_EXPRESS_THRESHOLD - subtotal),
    percent: Math.min(100, (subtotal / FREE_EXPRESS_THRESHOLD) * 100),
  };
}
