import type { NextRequest } from "next/server";
import { getBlogPosts, getFeaturedPost, type BlogListResponse } from "@/server";
import { handle, json, localeParam } from "@/app/api/_lib";

/** GET /api/blog?locale= → todos los artículos y el destacado. */
export async function GET(request: NextRequest) {
  return handle(async () => {
    const locale = localeParam(request.nextUrl.searchParams);
    const [items, featured] = await Promise.all([getBlogPosts(locale), getFeaturedPost(locale)]);
    return json<BlogListResponse>({ items, featured });
  });
}
