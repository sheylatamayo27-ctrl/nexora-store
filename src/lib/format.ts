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

/** Fecha legible en español, p. ej. "2 oct 2026". */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
