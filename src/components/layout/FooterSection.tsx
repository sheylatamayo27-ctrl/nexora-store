"use client";

import { Children, useEffect, useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Sección del footer. En móvil funciona como acordeón plegable (toca el título
 * para abrir/cerrar). En escritorio (lg) el botón se desactiva y el contenido
 * se muestra siempre como una columna, igual que el diseño.
 * Con `nav`, el contenido es una lista de enlaces (`<nav><ul><li>`).
 */
export function FooterSection({
  title,
  nav = false,
  children,
}: {
  title: string;
  nav?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  // En escritorio no hay acordeón: el botón sale del orden de tabulación y no
  // anuncia "contraído" (el contenido siempre está visible).
  const desktop = useIsDesktop();

  const contentClass = cn("flex-col gap-3 pb-4 lg:flex lg:gap-4 lg:pb-0", open ? "flex" : "hidden");

  return (
    <div className="border-b border-white/10 lg:border-0">
      <h4 className="text-label-lg">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={desktop ? undefined : open}
          aria-controls={desktop ? undefined : contentId}
          tabIndex={desktop ? -1 : undefined}
          className="flex w-full items-center justify-between py-4 text-left lg:cursor-default lg:py-0 lg:pointer-events-none"
        >
          {title}
          <Plus
            aria-hidden="true"
            className={cn(
              "h-4 w-4 text-white/70 transition-transform duration-200 lg:hidden",
              open && "rotate-45"
            )}
          />
        </button>
      </h4>
      {nav ? (
        <nav aria-label={title}>
          <ul id={contentId} className={contentClass}>
            {/* `flex`: el enlace se comporta como antes (elemento flex, sin caja de línea extra). */}
            {Children.map(children, (child) => (
              <li className="flex">{child}</li>
            ))}
          </ul>
        </nav>
      ) : (
        <div id={contentId} className={contentClass}>
          {children}
        </div>
      )}
    </div>
  );
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return desktop;
}
