/**
 * Tarifas de envío: las usan el checkout y la tabla de /shipping, así no pueden
 * contradecirse. Importes en la moneda de `formatPrice`.
 */
export const SHIPPING_RATES = { standard: 0, express: 199, sameday: 349 } as const;

export type ShippingMethod = keyof typeof SHIPPING_RATES;
