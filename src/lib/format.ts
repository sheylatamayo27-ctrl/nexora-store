import { intlLocales, type Locale } from "@/i18n/routing";

/**
 * Formato de precios. La moneda base de la tienda es el dólar estadounidense:
 * "$1,035.99" en ambos idiomas (los importes del catálogo están en USD).
 * Centralizado aquí para poder cambiar de moneda en un solo lugar.
 */
const CURRENCY = "USD";

const priceFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: CURRENCY });
const shortPriceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return priceFormat.format(amount);
}

/** Variante corta sin decimales, para tarjetas compactas en móvil y el filtro de precio. */
export function formatPriceShort(amount: number): string {
  return shortPriceFormat.format(Math.round(amount));
}

/** Calcula el porcentaje de descuento entre precio y precio de comparación. */
export function discountPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

/** Fecha legible en el idioma, p. ej. "2 oct 2026" (es) o "Oct 2, 2026" (en). */
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(intlLocales[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/** Número con separador de miles del idioma, p. ej. "1,240" (es-MX y en-US). */
export function formatNumber(value: number, locale: Locale): string {
  return value.toLocaleString(intlLocales[locale]);
}
