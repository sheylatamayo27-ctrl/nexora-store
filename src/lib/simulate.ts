/**
 * Petición simulada para los formularios mientras la tienda no tenga backend:
 * espera `ms` y resuelve. Sin conexión falla, como fallaría la petición real,
 * así el formulario ya maneja el caso de error. Para conectarlo, cámbiala por
 * el `fetch` real (p. ej. POST /api/auth/login).
 */
export function simulateRequest(ms: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => (navigator.onLine ? resolve() : reject(new Error("Sin conexión"))), ms);
  });
}
