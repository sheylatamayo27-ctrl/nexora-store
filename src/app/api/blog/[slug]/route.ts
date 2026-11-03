import type { NextRequest } from "next/server";
import { getPostBySlug, getRelatedPosts, type BlogPostResponse } from "@/server";
import { handle, json, localeParam, notFound } from "@/app/api/_lib";

/** GET /api/blog/[slug]?locale= → el artículo y sus relacionados, o 404. */
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  return handle(async () => {
    const locale = localeParam(request.nextUrl.searchParams);
    const post = await getPostBySlug(params.slug, locale);
    if (!post) return notFound(`No existe el artículo "${params.slug}".`);
    return json<BlogPostResponse>({ post, related: await getRelatedPosts(params.slug, locale) });
  });
}
