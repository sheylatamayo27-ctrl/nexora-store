/** Id de la región viva global (la pinta `app/document.tsx`). */
export const ANNOUNCER_ID = "sr-announcements";

/**
 * Anuncia `message` a los lectores de pantalla (región `aria-live="polite"`).
 * Úsalo solo en acciones sin toast: los toasts de sonner ya se anuncian solos.
 * Se vacía y se rellena en el siguiente frame para que el mismo texto se
 * vuelva a leer si se repite la acción.
 */
export function announce(message: string) {
  const el = document.getElementById(ANNOUNCER_ID);
  if (!el) return;
  el.textContent = "";
  requestAnimationFrame(() => {
    el.textContent = message;
  });
}
