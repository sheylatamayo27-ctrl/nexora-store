/**
 * Consentimiento de cookies (banner `components/layout/CookieConsent.tsx`).
 *
 * Se guarda en localStorage bajo `nexora-cookie-consent` como
 * `{ analytics: boolean; marketing: boolean; timestamp: string }` (las esenciales
 * siempre están activas). Para conectar tu analítica real:
 *
 *   const consent = readCookieConsent();
 *   if (consent?.analytics) cargarAnalytics();
 *   window.addEventListener(COOKIE_CONSENT_EVENT, (e) => {
 *     if ((e as CustomEvent<CookieConsent>).detail.analytics) cargarAnalytics();
 *   });
 */
export const COOKIE_CONSENT_KEY = "nexora-cookie-consent";

export const COOKIE_CONSENT_EVENT = "nexora:cookie-consent";

export interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export type CookieChoice = Omit<CookieConsent, "timestamp">;

export function readCookieConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<CookieConsent>;
    if (typeof value.analytics !== "boolean" || typeof value.marketing !== "boolean") return null;
    return value as CookieConsent;
  } catch {
    return null;
  }
}

export function saveCookieConsent(choice: CookieChoice): CookieConsent {
  const consent: CookieConsent = { ...choice, timestamp: new Date().toISOString() };
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  } catch {
  }
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }));
  return consent;
}
