/**
 * Tracking Service — Rastreo de pedidos (/track-order).
 *
 * Actualmente simula la respuesta (mock): cualquier número de pedido válido
 * devuelve el mismo envío de ejemplo "En camino", con fechas relativas al
 * momento de la consulta (así nunca se ven caducadas). Para conectar un backend real:
 * 1. Reemplaza la implementación de `trackOrder` por la llamada a tu API
 * 2. La vista (src/components/track-order/TrackOrderView.tsx) NO necesita cambios
 * 3. Ejemplo con API REST:
 *    export async function trackOrder(orderNumber, email) {
 *      const params = new URLSearchParams({ email });
 *      const res = await fetch(`/api/orders/${encodeURIComponent(orderNumber)}/tracking?${params}`);
 *      if (!res.ok) throw new Error("Pedido no encontrado");
 *      const json = await res.json();
 *      // Las fechas llegan como texto ISO: conviértelas a Date.
 *      return {
 *        ...json,
 *        estimatedDelivery: new Date(json.estimatedDelivery),
 *        steps: json.steps.map((s) => ({ ...s, date: new Date(s.date) })),
 *      };
 *    }
 *
 * Textos: `label` y `carrier` pueden ser claves de traducción del namespace
 * "trackOrder" (lo que devuelve el mock) o texto ya listo para mostrar (lo que
 * devolvería un backend real); la vista traduce las claves y pinta el resto tal cual.
 *
 * Errores: cualquier error que lance la función hace que el formulario muestre
 * el aviso de fallo ("Revisa tu conexión").
 */
import { simulateRequest } from "@/lib/simulate";

export type TrackingStatus = "received" | "processing" | "in_transit" | "delivered";

export interface TrackingStep {
  status: TrackingStatus;
  /** Fecha del paso: real si ya ocurrió, estimada si está pendiente. */
  date: Date;
  /** Clave de "trackOrder" (p. ej. "stepReceived") o texto ya traducido. */
  label: string;
}

export interface TrackingResult {
  orderNumber: string;
  currentStatus: TrackingStatus;
  estimatedDelivery: Date;
  /** Clave de "trackOrder" (p. ej. "carrierName") o texto ya traducido. */
  carrier: string;
  /** En orden cronológico; los posteriores a `currentStatus` están pendientes. */
  steps: TrackingStep[];
}

/** Latencia simulada. `simulateRequest` falla sin conexión, como la petición real. */
const MOCK_DELAY = 1500;
const DAY = 24 * 60 * 60 * 1000;

/** `offset` días desde `now`, a la hora local "HH:MM". */
function at(now: number, offset: number, time: string) {
  const date = new Date(now + offset * DAY);
  const [h, m] = time.split(":").map(Number);
  date.setHours(h, m, 0, 0);
  return date;
}

export async function trackOrder(orderNumber: string, email: string): Promise<TrackingResult> {
  void email;
  await simulateRequest(MOCK_DELAY);
  const now = Date.now();
  return {
    orderNumber,
    currentStatus: "in_transit",
    estimatedDelivery: at(now, 2, "18:00"),
    carrier: "carrierName",
    steps: [
      { status: "received", date: at(now, -2, "10:42"), label: "stepReceived" },
      { status: "processing", date: at(now, -1, "09:15"), label: "stepProcessing" },
      { status: "in_transit", date: at(now, 0, "07:30"), label: "stepInTransit" },
      { status: "delivered", date: at(now, 2, "18:00"), label: "stepDelivered" },
    ],
  };
}
