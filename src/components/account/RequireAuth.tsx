"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import { useHydrated } from "@/hooks/useHydrated";
import { useAuth } from "@/store/auth";

export function RequireAuth({ fallback, children }: { fallback: React.ReactNode; children: React.ReactNode }) {
  const hydrated = useHydrated();
  const user = useAuth((s) => s.user);
  const router = useRouter();
  const hadSession = useRef(false);
  if (user) hadSession.current = true;

  useEffect(() => {
    if (hydrated && !user && !hadSession.current) router.replace("/login");
  }, [hydrated, user, router]);

  return <>{hydrated && user ? children : fallback}</>;
}
