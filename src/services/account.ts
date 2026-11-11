/**
 * Account Service — Datos de la cuenta del usuario (/account/*).
 *
 * Actualmente simula las respuestas (mock): el perfil sale de la sesión del
 * store (src/store/auth.ts) y direcciones, métodos de pago y notificaciones
 * llegan vacíos. Para conectar un backend real:
 * 1. Reemplaza las implementaciones de cada función con llamadas a tu API
 * 2. Envía el token de la sesión: `useAuth.getState().token` en
 *    `Authorization: Bearer <token>`
 * 3. Ejemplo con API REST:
 *    export async function updateProfile(data) {
 *      const res = await fetch("/api/account/profile", {
 *        method: "PATCH",
 *        headers: { "Content-Type": "application/json", Authorization: `Bearer ${useAuth.getState().token}` },
 *        body: JSON.stringify(data),
 *      });
 *      if (!res.ok) throw new Error("No se pudo guardar el perfil");
 *      const user = await res.json();
 *      useAuth.getState().updateProfile(user); // el header y el perfil se actualizan
 *      return user;
 *    }
 *
 * Errores: cualquier error que lancen hace que la vista muestre el aviso de
 * fallo ("Revisa tu conexión").
 */
import { simulateRequest } from "@/lib/simulate";
import { useAuth } from "@/store/auth";
import type { User } from "@/services/auth";

export interface Address {
  id: string;
  /** Nombre que le da el usuario ("Casa", "Oficina"). */
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  /** Departamento, interior… */
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  /** Código ISO 3166-1 alfa-2 ("MX"). */
  country: string;
  isDefault: boolean;
}

export type PaymentMethodType = "card" | "paypal" | "bank";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  /** Marca de la tarjeta ("visa", "mastercard", "amex"); solo si `type` es "card". */
  brand?: string;
  /** Últimos 4 dígitos de la tarjeta o cuenta. Nunca el número completo. */
  last4?: string;
  /** Vencimiento de la tarjeta. */
  expMonth?: number;
  expYear?: number;
  holderName?: string;
  /** Correo de la cuenta, si `type` es "paypal". */
  email?: string;
  isDefault: boolean;
}

export type NotificationType = "order" | "shipping" | "promotion" | "wishlist" | "account";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  /** Fecha ISO 8601 de creación. */
  createdAt: string;
  read: boolean;
  /** Ruta a la que lleva al pulsarla (p. ej. "/account"). */
  href?: string;
}

/** Latencia simulada. `simulateRequest` falla sin conexión, como la petición real. */
const MOCK_DELAY = 800;

/**
 * Perfil del usuario con sesión.
 * Real: GET /api/account/profile.
 */
export async function getProfile(): Promise<User> {
  const { user } = useAuth.getState();
  if (!user) throw new Error("Sin sesión");
  return user;
}

/**
 * Guarda los datos del perfil y actualiza la sesión (header, /account).
 * Real: PATCH /api/account/profile. El mock solo guarda nombre y correo: el
 * teléfono aún no forma parte de `User`.
 */
export async function updateProfile(data: { name: string; email: string; phone?: string }): Promise<User> {
  await simulateRequest(MOCK_DELAY);
  const { updateProfile: saveToSession } = useAuth.getState();
  saveToSession({ name: data.name, email: data.email });
  return getProfile();
}

/** Direcciones guardadas. Real: GET /api/account/addresses. */
export async function getAddresses(): Promise<Address[]> {
  return [];
}

/** Métodos de pago guardados. Real: GET /api/account/payment-methods. */
export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  return [];
}

/** Notificaciones del usuario, de la más reciente a la más antigua. Real: GET /api/account/notifications. */
export async function getNotifications(): Promise<Notification[]> {
  return [];
}
