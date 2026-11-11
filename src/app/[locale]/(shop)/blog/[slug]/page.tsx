import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BlogCard } from "@/components/blog/BlogCard";
import { AssetImage } from "@/components/media/AssetImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import { localeAlternates, socialMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/lib/motion";
import { formatDate } from "@/lib/format";
import { assetSrc } from "@/lib/assets";
import { blogPostJsonLd, breadcrumbJsonLd } from "@/lib/jsonLd";
import { getBlogPosts, getPostBySlug, getRelatedPosts } from "@/server";
import type { BlogBlock } from "@/data/types";

type Params = { locale: Locale; slug: string };

export async function generateStaticParams({ params: { locale } }: { params: { locale: Locale } }) {
  const blogPosts = await getBlogPosts(locale);
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params: { locale, slug } }: { params: Params }): Promise<Metadata> {
  const post = await getPostBySlug(slug, locale);
  if (!post) {
    const t = await getTranslations({ locale, namespace: "metadata" });
    return { title: t("postNotFound") };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: localeAlternates(`/blog/${slug}`, locale),
    ...socialMetadata(locale, {
      pathname: `/blog/${slug}`,
      title: post.title,
      description: post.excerpt,
      image: assetSrc(post.coverFolder, post.cover),
      article: { publishedTime: post.date, authors: [post.author.name] },
    }),
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="text-h3 text-text-primary">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="border-l-4 border-brand-500 bg-surface-subtle px-5 py-4">
          <p className="text-h4 text-text-primary">“{block.text}”</p>
          {block.cite && <cite className="mt-2 block text-label-sm not-italic text-text-secondary">— {block.cite}</cite>}
        </blockquote>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-body-lg text-text-secondary">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="text-body-lg leading-relaxed text-text-secondary">{block.text}</p>;
  }
}

export default async function BlogPostPage({ params: { locale, slug } }: { params: Params }) {
  setRequestLocale(locale);
  const post = await getPostBySlug(slug, locale);
  if (!post) notFound();

  const [related, t, tc] = await Promise.all([
    getRelatedPosts(post.slug, locale),
    getTranslations({ locale, namespace: "blog" }),
    getTranslations({ locale, namespace: "common" }),
  ]);

  return (
    <div className="bg-surface-subtle">
      <article>
        <div className="bg-surface">
          <Container className="flex flex-col gap-5 py-8">
            <Breadcrumb items={[{ label: t("breadcrumb"), href: "/blog" }, { label: post.title }]} />
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              <span className="w-fit rounded-full bg-brand-100 px-3 py-1 text-label-sm text-brand-800">
                {post.category}
              </span>
              <h1 className="text-h2 text-text-primary sm:text-display-l">{post.title}</h1>
              <p className="text-body-lg text-text-secondary">{post.excerpt}</p>
              <div className="flex flex-wrap items-center gap-3 text-body-sm text-text-muted">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-label-sm text-brand-800">
                  {post.author.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div className="flex flex-col">
                  <span className="text-label-sm text-text-primary">{post.author.name}</span>
                  <span className="text-body-sm text-text-muted">{post.author.role}</span>
                </div>
                <span className="h-4 w-px bg-border" />
                <span>{formatDate(post.date, locale)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {t("readingTime", { minutes: post.readingMinutes })}
                </span>
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-8">
          <Reveal>
            <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl bg-surface-subtle">
              <AssetImage
                folder={post.coverFolder}
                name={post.cover}
                alt={post.title}
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
          </Reveal>
        </Container>

        <Container className="pb-12">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
            <Link
              href="/blog"
              className="mt-4 flex w-fit items-center gap-1.5 text-label text-brand-700 transition-colors hover:text-brand-800"
            >
              <ArrowLeft className="h-4 w-4" /> {t("backToBlog")}
            </Link>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-surface py-12">
          <Container className="flex flex-col gap-8">
            <h2 className="text-h3 text-text-primary sm:text-h2">{t("related")}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} className="h-full" />
              ))}
            </div>
          </Container>
        </section>
      )}

      <JsonLd data={blogPostJsonLd(post, locale)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [{ name: tc("home"), href: "/" }, { name: t("breadcrumb"), href: "/blog" }, { name: post.title }],
          locale,
        )}
      />
    </div>
  );
}
