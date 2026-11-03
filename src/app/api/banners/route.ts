import type { NextRequest } from "next/server";
import { getPromoBanners, type BannersResponse } from "@/server";
import { handle, json, localeParam } from "@/app/api/_lib";

/** GET /api/banners?locale= */
export async function GET(request: NextRequest) {
  return handle(async () => json<BannersResponse>(await getPromoBanners(localeParam(request.nextUrl.searchParams))));
}
