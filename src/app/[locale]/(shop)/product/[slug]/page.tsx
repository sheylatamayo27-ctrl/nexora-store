import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductView } from "@/components/product/ProductView";
import { JsonLd } from "@/components/seo/JsonLd";
import { localeAlternates, socialMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { assetSrc } from "@/lib/assets";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/jsonLd";
import { getCategories, getProductBySlug, getProducts } from "@/server";

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
  const description = product.shortDescription ?? t("productDescription", { name: product.name });
  return {
    title: product.name,
    description,
    alternates: localeAlternates(`/product/${slug}`, locale),
    ...socialMetadata(locale, {
      pathname: `/product/${slug}`,
      title: product.name,
      description,
      image: assetSrc("products", product.image),
    }),
  };
}

export default async function ProductPage({ params: { locale, slug } }: { params: Params }) {
  setRequestLocale(locale);
  const product = await getProductBySlug(slug, locale);
  if (!product) notFound();

  const [products, categories, tc, tm] = await Promise.all([
    getProducts(locale),
    getCategories(locale),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "metadata" }),
  ]);
  const related = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.categorySlug === product.categorySlug ? -1 : 0))
    .slice(0, 5);
  const category = categories.find((c) => c.slug === product.categorySlug);

  return (
    <>
      <ProductView product={product} related={related} />
      <JsonLd
        data={productJsonLd(
          product,
          locale,
          product.shortDescription ?? tm("productDescription", { name: product.name }),
        )}
      />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: tc("home"), href: "/" },
            ...(category ? [{ name: category.name, href: `/category/${category.slug}` }] : []),
            { name: product.name },
          ],
          locale,
        )}
      />
    </>
  );
}
