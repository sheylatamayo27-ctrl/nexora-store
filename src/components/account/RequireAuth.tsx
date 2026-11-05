"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import { useHydrated } from "@/hooks/useHydrated";
import { useAuth } from "@/store/auth";

/**
 * Protección suave (solo cliente) de las rutas de /account: sin sesión manda a
 * /login. Mientras no se conoce la sesión (HTML del servidor, hidratación) o
 * mientras redirige, pinta `fallback`. Para una protección real haría falta
 * comprobar el token en el servidor (middleware), pero esta tienda es una demo.
 */
export function RequireAuth({ fallback, children }: { fallback: React.ReactNode; children: React.ReactNode }) {
  const hydrated = useHydrated();
  const user = useAuth((s) => s.user);
  const router = useRouter();
  // Si la sesión se cierra estando aquí, quien la cierra ya lleva al inicio: no
  // hay que mandar a /login (las dos navegaciones competirían).
  const hadSession = useRef(false);
  if (user) hadSession.current = true;

  useEffect(() => {
    if (hydrated && !user && !hadSession.current) router.replace("/login");
  }, [hydrated, user, router]);

  return <>{hydrated && user ? children : fallback}</>;
}
