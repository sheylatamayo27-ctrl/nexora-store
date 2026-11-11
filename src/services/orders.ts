/**
 * Orders Service — Crear pedidos (checkout) y consultar los del usuario (/account).
 *
 * Actualmente simula las respuestas (mock) con los datos de
 * src/server/db/orders.data.ts. Para conectar un backend real:
 * 1. Reemplaza las implementaciones de cada función con llamadas a tu API
 * 2. Los componentes (CheckoutView, OrdersView) NO necesitan cambios
 * 3. Ejemplo con API REST:
 *    export async function placeOrder(data) {
 *      const res = await fetch("/api/orders", {
 *        method: "POST",
 *        headers: { "Content-Type": "application/json" },
 *        body: JSON.stringify(data),
 *      });
 *      if (!res.ok) throw new Error("No se pudo procesar el pago");
 *      return res.json(); // { orderId }
 *    }
 *
 * Si la API pide sesión, envía el token del store: `useAuth.getState().token`
 * en `Authorization: Bearer <token>`.
 *
 * Errores: cualquier error que lance `placeOrder` hace que el checkout muestre
 * el aviso de pago fallido ("Revisa tu conexión").
 */
import { simulateRequest } from "@/lib/simulate";
import type { CheckoutData } from "@/lib/schemas/checkout";
import { orders, type Order } from "@/server/db/orders.data";

export type { Order, OrderItem, OrderStatus } from "@/server/db/orders.data";

/** Latencia simulada del cobro. `simulateRequest` falla sin conexión, como la petición real. */
const MOCK_PLACE_DELAY = 2000;

/**
 * Crea el pedido con los datos validados del checkout.
 * Real: POST /api/orders → { orderId }.
 */
export async function placeOrder(data: CheckoutData): Promise<{ orderId: string }> {
  void data;
  await simulateRequest(MOCK_PLACE_DELAY);
  return { orderId: `#NX-${Math.floor(100000 + Math.random() * 900000)}` };
}

/**
 * Pedidos del usuario con sesión, del más reciente al más antiguo.
 * Real: GET /api/orders.
 */
export async function getOrders(): Promise<Order[]> {
  return orders;
}

/**
 * Un pedido por su id (p. ej. "#NX-482913"), o `null` si no existe.
 * Real: GET /api/orders/:id (con el id codificado con `encodeURIComponent`).
 */
export async function getOrderById(id: string): Promise<Order | null> {
  return orders.find((o) => o.id === id) ?? null;
}
