/**
 * Configuración de la capa de datos.
 *
 * `apiBase` es la URL de la API. La usa el cliente (fetcher de SWR,
 * `src/lib/fetcher.ts`) para pedir a `/api`; `src/server` NO la usa: lee del
 * catálogo local (`./db`) y es lo que sirven los handlers de `/api` (si leyera de
 * `/api`, se llamarían a sí mismos). Se define en `.env.local` (ver `.env.example`)
 * con el prefijo NEXT_PUBLIC_ para que esté disponible en el navegador.
 */
const DEFAULT_API_BASE_URL = "/api";

/** URL base sin barra final, lista para `fetch(apiBase + "/products")`. */
export const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
