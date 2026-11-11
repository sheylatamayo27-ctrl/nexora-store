/**
 * Contact Service — Envío del formulario de /contact.
 *
 * Actualmente simula la respuesta (mock). Para conectar un backend real:
 * 1. Reemplaza la implementación de `submitContactForm` por la llamada a tu API
 * 2. El formulario (src/components/contact/ContactForm.tsx) NO necesita cambios
 * 3. Ejemplo con API REST:
 *    export async function submitContactForm(data) {
 *      const res = await fetch("/api/contact", {
 *        method: "POST",
 *        headers: { "Content-Type": "application/json" },
 *        body: JSON.stringify(data),
 *      });
 *      if (!res.ok) throw new Error("No se pudo enviar el mensaje");
 *    }
 *
 * Errores: cualquier error que lance la función hace que el formulario muestre
 * el aviso de fallo ("Revisa tu conexión").
 */
import { simulateRequest } from "@/lib/simulate";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Latencia simulada. `simulateRequest` falla sin conexión, como la petición real. */
const MOCK_DELAY = 1500;

export async function submitContactForm(data: ContactPayload): Promise<void> {
  void data;
  await simulateRequest(MOCK_DELAY);
}
