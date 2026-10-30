"use client";

import { SWRConfig, type SWRConfiguration } from "swr";
import { fetcher } from "@/lib/fetcher";

/**
 * SWR para un catálogo: los datos cambian poco, así que no se revalida al volver
 * a la pestaña, se reutiliza una respuesta durante un minuto y, al cambiar de
 * parámetros, se sigue mostrando lo anterior hasta que llega lo nuevo.
 */
const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  dedupingInterval: 60_000,
  keepPreviousData: true,
};

/** Proveedores de cliente de toda la app (los children siguen siendo Server Components). */
export function Providers({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
