import type { Metadata } from "next";
import { Clock, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BlogCard } from "@/components/blog/BlogCard";
import { AssetImage } from "@/components/media/AssetImage";
import { Link } from "@/i18n/navigation";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/lib/motion";
import { formatDate } from "@/lib/format";
import { getBlogPosts, getFeaturedPost } from "@/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("blog"),
    description: t("blogDescription"),
    alternates: localeAlternates("/blog", locale),
  };
}

export default async function BlogPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const [blogPosts, featuredPost, t, tCommon] = await Promise.all([
    getBlogPosts(locale),
    getFeaturedPost(locale),
    getTranslations({ locale, namespace: "blog" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const rest = blogPosts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <div className="bg-surface-subtle">
      <div className="bg-surface">
        <Container className="flex flex-col gap-5 py-8">
          <Breadcrumb items={[{ label: t("breadcrumb") }]} />
          <div className="flex flex-col gap-2">
            <h1 className="text-h2 text-text-primary sm:text-display-l">{t("title")}</h1>
            <p className="max-w-2xl text-body-lg text-text-secondary">{t("subtitle")}</p>
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
                {t("featured", { category: featuredPost.category })}
              </span>
              <h2 className="text-h3 text-text-primary sm:text-h2">{featuredPost.title}</h2>
              <p className="text-body-lg text-text-secondary">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-3 text-body-sm text-text-muted">
                <span className="text-label-sm text-text-secondary">{featuredPost.author.name}</span>
                <span>·</span>
                <span>{formatDate(featuredPost.date, locale)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {tCommon("minutes", { minutes: featuredPost.readingMinutes })}
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-label text-brand-700 transition-colors group-hover:text-brand-800">
                {t("readArticle")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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
