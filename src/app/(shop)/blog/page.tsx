import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BlogCard } from "@/components/blog/BlogCard";
import { AssetImage } from "@/components/media/AssetImage";
import { Reveal } from "@/lib/motion";
import { formatDate } from "@/lib/format";
import { blogPosts, featuredPost } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guías de compra, novedades y consejos tech del equipo de Nexora.",
};

export default function BlogPage() {
  const rest = blogPosts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <div className="bg-surface-subtle">
      <div className="bg-surface">
        <Container className="flex flex-col gap-5 py-8">
          <Breadcrumb items={[{ label: "Blog" }]} />
          <div className="flex flex-col gap-2">
            <h1 className="text-h2 text-text-primary sm:text-display-l">Blog Nexora</h1>
            <p className="max-w-2xl text-body-lg text-text-secondary">
              Guías de compra, análisis y consejos para sacarle el máximo a tu tecnología.
            </p>
          </div>
        </Container>
      </div>

      <Container className="flex flex-col gap-10 py-10">
        {/* Artículo destacado */}
        <Reveal>
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group grid overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-border-strong hover:shadow-elevation-md lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-subtle lg:aspect-auto">
              <AssetImage
                folder={featuredPost.coverFolder}
                name={featuredPost.cover}
                alt={featuredPost.title}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
              <span className="w-fit rounded-full bg-brand-100 px-3 py-1 text-label-sm text-brand-800">
                Destacado · {featuredPost.category}
              </span>
              <h2 className="text-h3 text-text-primary sm:text-h2">{featuredPost.title}</h2>
              <p className="text-body-lg text-text-secondary">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-3 text-body-sm text-text-muted">
                <span className="text-label-sm text-text-secondary">{featuredPost.author.name}</span>
                <span>·</span>
                <span>{formatDate(featuredPost.date)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {featuredPost.readingMinutes} min
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-label text-brand-700 transition-colors group-hover:text-brand-800">
                Leer artículo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Resto de artículos */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <BlogCard post={post} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
