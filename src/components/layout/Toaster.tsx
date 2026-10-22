"use client";

import { Toaster as SonnerToaster } from "sonner";

/**
 * Toaster global de Nexora (sonner). Los toasts usan markup propio de marca
 * (ver `@/lib/toast`), por lo que ampliamos el ancho y despejamos la barra
 * inferior móvil para que no se solapen.
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      gap={10}
      offset={{ bottom: "20px", right: "20px" }}
      mobileOffset={{ bottom: "88px", left: "16px", right: "16px" }}
      style={{ "--width": "368px" } as React.CSSProperties}
    />
  );
}
