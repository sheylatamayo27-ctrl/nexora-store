import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Navegación consciente del idioma: sustituye a `next/link` y a los hooks de
 * `next/navigation`. En inglés los enlaces llevan el prefijo /en; `usePathname`
 * devuelve la ruta sin él (p. ej. "/cart" en ambos idiomas).
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
