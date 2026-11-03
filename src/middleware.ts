import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { legacyRedirect } from "./lib/legacy-redirects";

const handleI18nRouting = createMiddleware(routing);

/**
 * Primero redirige las URLs antiguas en español (/carrito → /cart…, ver
 * `lib/legacy-redirects.ts`) conservando la query.
 *
 * Después resuelve el idioma de cada página: /en/… → inglés; sin prefijo → español, o el
 * idioma guardado en la cookie NEXT_LOCALE (elegido con el selector o al entrar en
 * /en), que redirige a /en en visitas futuras.
 * El idioma del navegador (Accept-Language) no se usa: la tienda es en español por
 * defecto y sus URLs de siempre siguen mostrando español a todo el mundo. Para
 * detectarlo, basta con devolver `handleI18nRouting(request)` tal cual.
 */
export default function middleware(request: NextRequest) {
  const legacy = legacyRedirect(request.nextUrl.pathname);
  if (legacy) {
    const url = request.nextUrl.clone();
    url.pathname = legacy;
    return NextResponse.redirect(url, 308);
  }

  const headers = new Headers(request.headers);
  headers.delete("accept-language");
  return handleI18nRouting(new NextRequest(request, { headers }));
}

// Todo menos la API, los internos de Next y los archivos (rutas con punto).
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
