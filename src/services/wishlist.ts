/**
 * Wishlist Service — Sincronización de favoritos con la cuenta del usuario.
 *
 * Hoy los favoritos viven solo en el navegador (src/store/favorites.ts,
 * persistidos en localStorage) y este servicio simula la sincronización (mock).
 * Para guardarlos en la cuenta con un backend real:
 * 1. Reemplaza las implementaciones de cada función con llamadas a tu API
 * 2. Llama a `syncWishlist` desde el store al cambiar los favoritos y a
 *    `getWishlist` al iniciar sesión (ver el comentario en src/store/favorites.ts)
 * 3. Ejemplo con API REST:
 *    export async function syncWishlist(productIds) {
 *      const res = await fetch("/api/account/wishlist/sync", {
 *        method: "POST",
 *        headers: { "Content-Type": "application/json", Authorization: `Bearer ${useAuth.getState().token}` },
 *        body: JSON.stringify({ productIds }),
 *      });
 *      if (!res.ok) throw new Error("No se pudieron sincronizar los favoritos");
 *    }
 */
import { simulateRequest } from "@/lib/simulate";

/** Latencia simulada. `simulateRequest` falla sin conexión, como la petición real. */
const MOCK_DELAY = 500;

/**
 * Sustituye los favoritos guardados en la cuenta por `productIds` (ids de producto).
 * Real: POST /api/account/wishlist/sync.
 */
export async function syncWishlist(productIds: string[]): Promise<void> {
  void productIds;
  await simulateRequest(MOCK_DELAY);
}

/**
 * Ids de los productos favoritos guardados en la cuenta.
 * Real: GET /api/account/wishlist.
 */
export async function getWishlist(): Promise<string[]> {
  return [];
}
