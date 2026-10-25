"use client";

import { useRef, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Modal sobre Radix Dialog: portal, bloqueo de scroll compensando la barra
 * (sin salto lateral), foco atrapado y devuelto al cerrar, Esc y clic fuera.
 * Animaciones por data-state en globals.css (.modal-overlay / .modal-content):
 * hoja inferior en móvil y fade + escala leve desde sm.
 */
export function Modal({
  open,
  onClose,
  children,
  title,
  description,
  footer,
  className,
  srTitle = "Ventana",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  className?: string;
  /** Título solo para lectores de pantalla cuando no hay `title` visible. */
  srTitle?: string;
}) {
  // Mientras se anima el cierre, el padre suele vaciar las props (p. ej.
  // order = null); conservamos el último contenido para que no "salte".
  const last = useRef({ title, description, children, footer });
  if (open) last.current = { title, description, children, footer };
  const view = open ? { title, description, children, footer } : last.current;

  // Radix devuelve el foco al <Dialog.Trigger>; como el modal se abre desde
  // botones propios, recordamos el elemento enfocado al abrir y lo restauramos.
  const returnFocus = useRef<HTMLElement | null>(null);

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay fixed inset-0 z-[70] bg-brand-900/50" />
        <Dialog.Content
          {...(view.description ? {} : { "aria-describedby": undefined })}
          aria-modal="true"
          onOpenAutoFocus={() => {
            returnFocus.current = document.activeElement as HTMLElement | null;
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            returnFocus.current?.focus({ preventScroll: true });
          }}
          className={cn(
            "modal-content fixed inset-x-0 bottom-0 z-[70] flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-surface shadow-elevation-lg focus:outline-none",
            "sm:inset-0 sm:m-auto sm:h-fit sm:max-h-[min(92vh,calc(100vh-3rem))] sm:w-[calc(100%-3rem)] sm:max-w-lg sm:rounded-2xl",
            className
          )}
        >
          {view.title || view.description ? (
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
              <div className="flex flex-col gap-1">
                {view.title ? (
                  <Dialog.Title className="text-h4 text-text-primary">{view.title}</Dialog.Title>
                ) : (
                  <Dialog.Title className="sr-only">{srTitle}</Dialog.Title>
                )}
                {view.description && (
                  <Dialog.Description className="text-body-sm text-text-secondary">
                    {view.description}
                  </Dialog.Description>
                )}
              </div>
              <Dialog.Close
                aria-label="Cerrar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-subtle hover:text-text-primary"
              >
                <X className="h-5 w-5" />
              </Dialog.Close>
            </div>
          ) : (
            <Dialog.Title className="sr-only">{srTitle}</Dialog.Title>
          )}
          <div className="min-h-0 flex-1 overflow-y-auto">{view.children}</div>
          {view.footer && <div className="border-t border-border bg-surface px-6 py-4">{view.footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
