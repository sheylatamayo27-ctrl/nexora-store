"use client";

import { SWRConfig, type SWRConfiguration } from "swr";
import { fetcher } from "@/lib/fetcher";

const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  dedupingInterval: 60_000,
  keepPreviousData: true,
};

export function Providers({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
