/**
 * Auth Service — Capa de abstracción para autenticación.
 *
 * Actualmente simula las respuestas (mock). Para conectar un backend real:
 * 1. Reemplaza las implementaciones de cada función con llamadas a tu API
 * 2. El store (src/store/auth.ts) y los componentes NO necesitan cambios
 * 3. Ejemplo con API REST:
 *    export async function loginWithCredentials(email, password) {
 *      const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
 *      if (!res.ok) throw new AuthError("Credenciales inválidas", "invalid_credentials");
 *      return res.json(); // { user, token }
 *    }
 *
 * Errores: lanza `AuthError` cuando el backend rechaza la operación (los
 * formularios muestran su mensaje). Cualquier otro error se trata como fallo de
 * red ("Revisa tu conexión").
 */
import { simulateRequest } from "@/lib/simulate";

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export type AuthProvider = "google" | "apple";

/**
 * Motivo del rechazo. Los formularios traducen los conocidos (`auth.errors.*`);
 * con otro código, o sin él, muestran `message` tal cual llega.
 */
export type AuthErrorCode = "invalid_credentials" | "email_taken" | "provider_cancelled";

export class AuthError extends Error {
  constructor(
    message: string,
    public code?: AuthErrorCode
  ) {
    super(message);
    this.name = "AuthError";
  }
}

const PROVIDER_NAMES: Record<AuthProvider, string> = { google: "Google", apple: "Apple" };

/** Latencia simulada de cada llamada. `simulateRequest` falla sin conexión, como la petición real. */
const MOCK_DELAY = 1000;
const MOCK_TOKEN = "mock-jwt-token";

export async function loginWithCredentials(email: string, password: string): Promise<AuthResponse> {
  void password;
  await simulateRequest(MOCK_DELAY);
  // Cuenta de demostración: el mismo perfil que muestran los datos de ejemplo de la tienda.
  return { user: { name: "Sheyla Tamayo", email }, token: MOCK_TOKEN };
}

export async function registerUser(data: { name: string; email: string; password: string }): Promise<AuthResponse> {
  await simulateRequest(MOCK_DELAY);
  return { user: { name: data.name, email: data.email }, token: MOCK_TOKEN };
}

export async function loginWithProvider(provider: AuthProvider): Promise<AuthResponse> {
  await simulateRequest(MOCK_DELAY);
  return {
    user: { name: `Usuario ${PROVIDER_NAMES[provider]}`, email: "usuario@gmail.com" },
    token: MOCK_TOKEN,
  };
}

export async function logoutUser(): Promise<void> {
  await simulateRequest(MOCK_DELAY);
}
