"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Sección del footer. En móvil funciona como acordeón plegable (toca el título
 * para abrir/cerrar). En escritorio (lg) el botón se desactiva y el contenido
 * se muestra siempre como una columna, igual que el diseño.
 */
export function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 md:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left md:cursor-default md:py-0 md:pointer-events-none"
      >
        <h4 className="text-label-lg">{title}</h4>
        <Plus
          className={cn(
            "h-4 w-4 text-white/70 transition-transform duration-200 md:hidden",
            open && "rotate-45"
          )}
        />
      </button>
      <div
        className={cn(
          "flex-col gap-3 pb-4 md:flex md:gap-4 md:pb-0",
          open ? "flex" : "hidden"
        )}
      >
        {children}
      </div>
    </div>
  );
}
