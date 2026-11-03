"use client";

import { useEffect, useState } from "react";
import { Heart, Share2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useFavorites } from "@/store/favorites";
import { useCart } from "@/store/cart";
import { notifyToast } from "@/lib/toast";

/** Favoritos. El contenido sale del store del navegador (localStorage). */
export function WishlistView() {
  const t = useTranslations("wishlist");
  const tCommon = useTranslations("common");
  const [mounted, setMounted] = useState(false);
  const items = useFavorites((s) => s.items);
  const addToCart = useCart((s) => s.add);
  useEffect(() => setMounted(true), []);

  const addAll = () => {
    items.forEach((p) => addToCart(p));
    notifyToast({
      title: t("addedToCart", { count: items.length }),
      description: t("readyToCheckout"),
    });
  };

  const share = () =>
    notifyToast({
      title: t("linkCopied"),
      description: t("shareWithAnyone"),
      icon: Share2,
    });

  if (!mounted) return <div className="min-h-[60vh]" />;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-surface px-6 py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sale-100">
          <Heart className="h-9 w-9 text-sale-500" />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-h3 text-text-primary">{t("emptyTitle")}</h1>
          <p className="max-w-md text-body-lg text-text-secondary">{t("emptyDescription")}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/category/headphones" variant="primary" size="lg">
            {t("explore")}
          </ButtonLink>
          <ButtonLink href="/offers" variant="outline" size="lg">
            <Sparkles className="h-[18px] w-[18px]" /> {tCommon("viewOffers")}
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-h2 text-text-primary">{t("title")}</h1>
          <p className="text-body text-text-secondary">{t("savedCount", { count: items.length })}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={share}>
            {t("shareList")}
          </Button>
          <Button variant="primary" onClick={addAll}>
            {t("addAll")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} showColors={false} />
        ))}
      </div>

      <p className="text-body-sm text-text-muted">{t("footnote")}</p>
    </div>
  );
}
