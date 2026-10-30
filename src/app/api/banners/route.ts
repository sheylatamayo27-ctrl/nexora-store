import { getPromoBanners, type BannersResponse } from "@/server";
import { handle, json } from "@/app/api/_lib";

/** GET /api/banners */
export async function GET() {
  return handle(async () => json<BannersResponse>(await getPromoBanners()));
}
