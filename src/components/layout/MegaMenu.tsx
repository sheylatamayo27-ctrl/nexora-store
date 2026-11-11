"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LayoutGrid, Zap, ArrowRight, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { secondaryNav } from "@/components/layout/nav-links";
import { AssetImage } from "@/components/media/AssetImage";
import type { BlogPost, Category, Product } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { discountPercent, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface MegaMenuData {
  categories: Category[];
  deals: Product[];
  posts: Pick<BlogPost, "slug" | "title" | "category" | "cover" | "coverFolder" | "readingMinutes">[];
}

type MenuKey = "electronics" | "offers" | "blogs";

const navItems: { key: MenuKey; href: string; hot?: boolean }[] = [
  { key: "electronics", href: "/category/headphones" },
  { key: "offers", href: "/offers", hot: true },
  { key: "blogs", href: "/blog" },
];

export function MegaMenu({ data }: { data: MegaMenuData }) {
  const t = useTranslations("nav");
  const [activeKey, setActiveKey] = useState<MenuKey | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout>>();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const scheduleOpen = (key: MenuKey) => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setActiveKey(key), 80);
  };
  const scheduleClose = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setActiveKey(null), 150);
  };
  const cancelClose = () => clearTimeout(closeTimer.current);
  const closeNow = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    setActiveKey(null);
  };

  return (
    <nav
      className="relative hidden border-b border-border bg-surface lg:block"
      onMouseLeave={scheduleClose}
      aria-label={t("main")}
    >
      <div className="container-page flex items-center justify-between py-3">
        <div className="flex items-center gap-8">
          <Link
            href="/category/headphones"
            className="flex items-center gap-2 rounded-md bg-brand-100 px-4 py-2 text-label text-brand-800 transition-colors hover:bg-brand-500 hover:text-white"
          >
            <LayoutGrid className="h-[18px] w-[18px]" />
            {t("shopAll")}
            <ChevronDown className="h-3.5 w-3.5" />
          </Link>

          {navItems.map((item) => (
            <div
              key={item.key}
              className="flex"
              onMouseEnter={() => scheduleOpen(item.key)}
            >
              <Link
                href={item.href}
                aria-expanded={activeKey === item.key}
                aria-haspopup="true"
                onFocus={() => setActiveKey(item.key)}
                onKeyDown={(e) => e.key === "Escape" && closeNow()}
                className={cn(
                  "flex items-center gap-1 text-label transition-colors hover:text-brand-700",
                  activeKey === item.key ? "text-brand-700" : "text-text-primary"
                )}
              >
                {t(item.key)}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 text-text-secondary transition-transform",
                    activeKey === item.key && "rotate-180"
                  )}
                />
                {item.hot && (
                  <span className="rounded-sm bg-accent-500 px-1.5 py-0.5 text-label-xs text-brand-900">
                    {t("hot")}
                  </span>
                )}
              </Link>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link href="/category/headphones" className="flex items-center gap-1.5 text-label text-brand-700">
            <Zap className="h-4 w-4 text-accent-600" /> {t("allCollections")}
          </Link>
          {secondaryNav.map((item) => (
            <div key={item.key} className="flex items-center gap-6">
              <span className="h-4 w-px bg-border" />
              <Link href={item.href} className="text-label text-text-secondary hover:text-text-primary">
                {t(item.key)}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeKey && (
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="absolute left-0 right-0 top-full z-40 border-b border-border bg-surface shadow-elevation-lg"
          >
            <div className="container-page py-8">
              {activeKey === "electronics" && <ElectronicaPanel categories={data.categories} />}
              {activeKey === "offers" && <OfertasPanel deals={data.deals} />}
              {activeKey === "blogs" && <BlogsPanel posts={data.posts} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function ElectronicaPanel({ categories }: { categories: MegaMenuData["categories"] }) {
  const t = useTranslations("megaMenu");
  const tCommon = useTranslations("common");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-label-lg text-text-primary">{t("shopByCategory")}</h3>
        <Link
          href="/category/headphones"
          className="flex items-center gap-1 text-label-sm text-brand-700 hover:text-brand-800"
        >
          {t("viewAllCategories")} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-brand-500 hover:bg-surface-subtle"
          >
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-surface-subtle">
              <AssetImage folder="products" name={cat.image} alt={cat.name} sizes="44px" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-label-sm text-text-primary group-hover:text-brand-700">
                {cat.name}
              </span>
              <span className="text-body-sm text-text-muted">{tCommon("itemCount", { count: cat.itemCount })}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function OfertasPanel({ deals }: { deals: MegaMenuData["deals"] }) {
  const t = useTranslations("megaMenu");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-label-lg text-text-primary">{t("topDiscounts")}</h3>
        <Link href="/offers" className="flex items-center gap-1 text-label-sm text-brand-700 hover:text-brand-800">
          {t("viewAllOffers")} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {deals.map((p) => {
          const pct = discountPercent(p.price, p.compareAt);
          return (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className="group flex gap-3 rounded-lg border border-border p-3 transition-colors hover:border-brand-500 hover:bg-surface-subtle"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-surface-subtle">
                <AssetImage folder="products" name={p.image} alt={p.name} sizes="64px" />
                {pct && (
                  <span className="absolute left-1 top-1 rounded-sm bg-sale-500 px-1 py-0.5 text-label-xs text-white">
                    −{pct}%
                  </span>
                )}
              </div>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="line-clamp-2 text-label-sm text-text-primary group-hover:text-brand-700">
                  {p.name}
                </span>
                <span className="text-price-sm text-text-primary">{formatPrice(p.price)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function BlogsPanel({ posts }: { posts: MegaMenuData["posts"] }) {
  const t = useTranslations("megaMenu");
  const tCommon = useTranslations("common");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-label-lg text-text-primary">{t("latestArticles")}</h3>
        <Link href="/blog" className="flex items-center gap-1 text-label-sm text-brand-700 hover:text-brand-800">
          {t("goToBlog")} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-center gap-3 rounded-lg border border-border p-2.5 transition-colors hover:border-brand-500 hover:bg-surface-subtle"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-surface-subtle">
              <AssetImage folder={post.coverFolder} name={post.cover} alt={post.title} sizes="48px" />
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-body-sm text-brand-700">{post.category}</span>
              <span className="line-clamp-2 text-label-sm leading-tight text-text-primary group-hover:text-brand-700">
                {post.title}
              </span>
              <span className="flex items-center gap-1 text-body-sm text-text-muted">
                <Clock className="h-3 w-3" /> {tCommon("minutes", { minutes: post.readingMinutes })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
