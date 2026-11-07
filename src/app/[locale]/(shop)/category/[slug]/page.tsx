import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CategoryView } from "@/components/category/CategoryView";
import { defaultFilters, toListQuery } from "@/components/category/query";
import { JsonLd } from "@/components/seo/JsonLd";
import { localeAlternates, socialMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { assetSrc } from "@/lib/assets";
import { breadcrumbJsonLd } from "@/lib/jsonLd";
import { getCategories, getProductFacets, listProducts } from "@/server";

type Params = { locale: Locale; slug: string };

async function resolve({ locale, slug }: Params) {
  const [categories, t] = await Promise.all([
    getCategories(locale),
    getTranslations({ locale, namespace: "metadata" }),
  ]);
  const category = categories.find((c) => c.slug === slug);
  if (category) {
    return {
      title: category.name,
      description: t("categoryDescription", { name: category.name.toLocaleLowerCase(locale) }),
      initialCategories: [slug],
      image: category.image,
    };
  }
  if (slug === "offers") {
    return {
      title: t("offers"),
      description: t("offersCategoryDescription"),
      initialCategories: [],
    };
  }
  return {
    title: t("electronics"),
    description: t("electronicsDescription"),
    initialCategories: [],
  };
}

export async function generateStaticParams({ params: { locale } }: { params: { locale: Locale } }) {
  const categories = await getCategories(locale);
  return [...categories.map((c) => ({ slug: c.slug })), { slug: "offers" }];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { title, description, image } = await resolve(params);
  const pathname = `/category/${params.slug}`;
  return {
    title,
    description,
    alternates: localeAlternates(pathname, params.locale),
    // Solo las categorías del catálogo tienen imagen; "offers" y el resto usan la del sitio.
    ...(image
      ? socialMetadata(params.locale, { pathname, title, description, image: assetSrc("products", image) })
      : {}),
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { locale, slug } = params;
  setRequestLocale(locale);
  const { title, description, initialCategories } = await resolve(params);
  // "offers" parte solo de los productos rebajados; el resto, de todo el catálogo.
  const saleOnly = slug === "offers";

  // Primera página con los filtros iniciales (la misma consulta que hará el cliente):
  // va en el HTML (SEO) y como fallback de SWR, así no hay parpadeo ni doble carga.
  const [categories, initialData, facets, tc] = await Promise.all([
    getCategories(locale),
    listProducts(toListQuery(defaultFilters(initialCategories), saleOnly), locale),
    getProductFacets({ sale: saleOnly }, locale),
    getTranslations({ locale, namespace: "common" }),
  ]);

  return (
    <>
      <CategoryView
        title={title}
        description={description}
        categories={categories}
        initialCategories={initialCategories}
        saleOnly={saleOnly}
        facets={facets}
        initialData={initialData}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: tc("home"), href: "/" }, { name: title }], locale)} />
    </>
  );
}
