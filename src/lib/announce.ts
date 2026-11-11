export const ANNOUNCER_ID = "sr-announcements";

export function announce(message: string) {
  const el = document.getElementById(ANNOUNCER_ID);
  if (!el) return;
  el.textContent = "";
  requestAnimationFrame(() => {
    el.textContent = message;
  });
}
