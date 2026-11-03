import { useLocale } from "next-intl";
import useSWR from "swr";
import type { SearchResponse } from "@/server/api-types";

const NO_RESULTS: SearchResponse = [];

/**
 * Búsqueda de productos en GET /api/search, en el idioma actual (va en la key: al
 * cambiar de idioma se pide de nuevo). Con `query` vacío no pide nada. Mientras
 * llega la respuesta de un término nuevo, `isLoading` es true y `results` conserva
 * los del anterior (`keepPreviousData`).
 */
export function useSearch(query: string, limit?: number) {
  const locale = useLocale();
  const q = query.trim();
  const params = new URLSearchParams(limit ? { q, limit: String(limit), locale } : { q, locale });
  const key = q ? `/search?${params}` : null;
  const { data, error, isLoading, mutate } = useSWR<SearchResponse, Error>(key);

  // Sin término no hay resultados (keepPreviousData devolvería los del anterior).
  return { results: (key && data) || NO_RESULTS, isLoading, error, mutate };
}
