/**
 * Newsletter Service — Suscripción a la newsletter (formulario de la home).
 *
 * Actualmente simula la respuesta (mock). Para conectar un backend real:
 * 1. Reemplaza la implementación de `subscribeNewsletter` por la llamada a tu API
 *    (o a tu proveedor de email marketing)
 * 2. El formulario (src/components/commerce/NewsletterForm.tsx) NO necesita cambios
 * 3. Ejemplo con API REST:
 *    export async function subscribeNewsletter(email) {
 *      const res = await fetch("/api/newsletter", {
 *        method: "POST",
 *        headers: { "Content-Type": "application/json" },
 *        body: JSON.stringify({ email }),
 *      });
 *      if (!res.ok) throw new Error("No se pudo completar la suscripción");
 *    }
 *
 * Errores: cualquier error que lance la función hace que el formulario muestre
 * el aviso de fallo ("Revisa tu conexión").
 */
import { simulateRequest } from "@/lib/simulate";

/** Latencia simulada. `simulateRequest` falla sin conexión, como la petición real. */
const MOCK_DELAY = 1000;

export async function subscribeNewsletter(email: string): Promise<void> {
  void email;
  await simulateRequest(MOCK_DELAY);
}
