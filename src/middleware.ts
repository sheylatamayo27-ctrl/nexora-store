import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { legacyRedirect } from "./lib/legacy-redirects";

const handleI18nRouting = createMiddleware(routing);

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

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
