import { useState } from "react";
import useSWR from "swr";
import type { ProductListQuery, ProductListResponse } from "@/server/api-types";

/**
 * Key de SWR (ruta bajo `apiBase`) de GET /products. Los parámetros van en orden
 * alfabético y se omiten los vacíos, así la misma consulta da siempre la misma key.
 * Las listas viajan separadas por comas.
 */
export function productsKey(params: ProductListQuery): string {
  const search = new URLSearchParams();
  for (const name of (Object.keys(params) as (keyof ProductListQuery)[]).sort()) {
    const value = params[name];
    if (value === undefined || value === false || value === "") continue;
    if (Array.isArray(value)) {
      if (value.length) search.set(name, value.join(","));
    } else {
      search.set(name, String(value));
    }
  }
  return `/products?${search}`;
}

const EMPTY_LIST: ProductListResponse = { items: [], total: 0, page: 1, pageSize: 0, totalPages: 0 };

interface UseProductsOptions {
  /** Respuesta ya calculada en el servidor para los parámetros iniciales (SEO, sin parpadeo). */
  fallbackData?: ProductListResponse;
}

/**
 * Listado paginado de GET /api/products. Con `params = null` no pide nada.
 * Mientras llegan datos de unos parámetros nuevos, `isLoading` es true y el resto
 * de campos conserva la respuesta anterior (`keepPreviousData`).
 */
export function useProducts(params: ProductListQuery | null, { fallbackData }: UseProductsOptions = {}) {
  const key = params ? productsKey(params) : null;

  // El fallback corresponde a los parámetros con los que se montó el hook. En cuanto
  // cambian se descarta para siempre: si no, SWR lo mostraría como respuesta de otros
  // parámetros. Volver a los iniciales los pide a la API como cualquier otra key.
  const [fallbackKey, setFallbackKey] = useState(fallbackData ? key : null);
  if (fallbackKey !== null && fallbackKey !== key) setFallbackKey(null);
  const withFallback = fallbackData !== undefined && fallbackKey === key;

  const { data, error, isLoading, mutate } = useSWR<ProductListResponse, Error>(
    key,
    // Sin doble carga: los datos del servidor ya son los de esta key.
    withFallback ? { fallbackData, revalidateOnMount: false } : undefined
  );

  return { ...(data ?? EMPTY_LIST), isLoading, error, mutate };
}
