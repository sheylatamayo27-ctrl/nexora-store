/**
 * Formato de precios. El diseño original usa la etiqueta "Rs." con separador de
 * miles y dos decimales (p. ej. "Rs. 1,800.00"). Centralizado aquí para poder
 * cambiar de moneda en un solo lugar si el negocio lo requiere.
 */
const CURRENCY_PREFIX = "Rs.";

export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${CURRENCY_PREFIX} ${formatted}`;
}

/** Variante corta sin decimales, para tarjetas compactas en móvil. */
export function formatPriceShort(amount: number): string {
  const formatted = new Intl.NumberFormat("en-US").format(Math.round(amount));
  return `${CURRENCY_PREFIX} ${formatted}`;
}

/** Calcula el porcentaje de descuento entre precio y precio de comparación. */
export function discountPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
