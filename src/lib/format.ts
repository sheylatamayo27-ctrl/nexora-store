import { intlLocales, type Locale } from "@/i18n/routing";

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

export function formatPriceShort(amount: number): string {
  return shortPriceFormat.format(Math.round(amount));
}

export function discountPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(intlLocales[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatNumber(value: number, locale: Locale): string {
  return value.toLocaleString(intlLocales[locale]);
}
