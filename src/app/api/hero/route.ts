import type { NextRequest } from "next/server";
import { getHeroSlides, type HeroResponse } from "@/server";
import { handle, json, localeParam } from "@/app/api/_lib";

/** GET /api/hero?locale= */
export async function GET(request: NextRequest) {
  return handle(async () => json<HeroResponse>(await getHeroSlides(localeParam(request.nextUrl.searchParams))));
}
