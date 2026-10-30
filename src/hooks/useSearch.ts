import useSWR from "swr";
import type { SearchResponse } from "@/server/api-types";

const NO_RESULTS: SearchResponse = [];

/**
 * Búsqueda de productos en GET /api/search. Con `query` vacío no pide nada.
 * Mientras llega la respuesta de un término nuevo, `isLoading` es true y `results`
 * conserva los del anterior (`keepPreviousData`).
 */
export function useSearch(query: string, limit?: number) {
  const q = query.trim();
  const key = q ? `/search?${new URLSearchParams(limit ? { q, limit: String(limit) } : { q })}` : null;
  const { data, error, isLoading, mutate } = useSWR<SearchResponse, Error>(key);

  // Sin término no hay resultados (keepPreviousData devolvería los del anterior).
  return { results: (key && data) || NO_RESULTS, isLoading, error, mutate };
}
