import { getHeroSlides, type HeroResponse } from "@/server";
import { handle, json } from "@/app/api/_lib";

/** GET /api/hero */
export async function GET() {
  return handle(async () => json<HeroResponse>(await getHeroSlides()));
}
