// Estilos globales: aquí (y no en `document.tsx`) para que Next los adjunte a todas
// las rutas, incluida la 404 (`not-found.tsx`). La fuente la carga `html.tsx`.
import "./globals.css";

/**
 * El documento (`<html lang>`) lo pinta `[locale]/layout.tsx`, que conoce el
 * idioma. Este layout raíz solo deja pasar: lo exige `app/not-found.tsx`.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
