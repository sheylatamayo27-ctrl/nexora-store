import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductView } from "@/components/product/ProductView";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { getProductBySlug, getProducts } from "@/server";

type Params = { locale: Locale; slug: string };

export async function generateStaticParams({ params: { locale } }: { params: { locale: Locale } }) {
  const products = await getProducts(locale);
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params: { locale, slug } }: { params: Params }): Promise<Metadata> {
  const [product, t] = await Promise.all([
    getProductBySlug(slug, locale),
    getTranslations({ locale, namespace: "metadata" }),
  ]);
  if (!product) return { title: t("productNotFound") };
  return {
    title: product.name,
    description: product.shortDescription ?? t("productDescription", { name: product.name }),
    alternates: localeAlternates(`/product/${slug}`, locale),
  };
}

export default async function ProductPage({ params: { locale, slug } }: { params: Params }) {
  setRequestLocale(locale);
  const product = await getProductBySlug(slug, locale);
  if (!product) notFound();

  const related = (await getProducts(locale))
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.categorySlug === product.categorySlug ? -1 : 0))
    .slice(0, 5);

  return <ProductView product={product} related={related} />;
}
