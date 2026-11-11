import { apiBase } from "@/server/config";
import type { ApiError } from "@/server/api-types";

export class FetchError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "FetchError";
    this.status = status;
  }
}

function isApiError(body: unknown): body is ApiError {
  return typeof body === "object" && body !== null && typeof (body as ApiError).error === "string";
}

/**
 * Fetcher global de SWR. La key es la ruta bajo `apiBase` (p. ej. "/products?page=2"):
 * pide `apiBase + key`, parsea el JSON y lanza `FetchError` si la respuesta no es ok.
 */
export async function fetcher<T>(path: string): Promise<T> {
  const res = await fetch(apiBase + path);
  if (!res.ok) {
    const body: unknown = await res.json().catch(() => null);
    throw new FetchError(res.status, isApiError(body) ? body.error : `Error ${res.status} en ${path}`);
  }
  return (await res.json()) as T;
}
