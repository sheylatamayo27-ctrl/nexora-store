"use client";

import { Heart, Share2, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useFavorites } from "@/store/favorites";
import { useCart } from "@/store/cart";
import { notifyToast } from "@/lib/toast";

export function WishlistView() {
  const items = useFavorites((s) => s.items);
  const addToCart = useCart((s) => s.add);

  const addAll = () => {
    items.forEach((p) => addToCart(p));
    notifyToast({
      title: `${items.length} ${items.length === 1 ? "producto añadido" : "productos añadidos"} al carrito`,
      description: "Ya puedes finalizar tu compra",
    });
  };

  const share = () =>
    notifyToast({
      title: "Enlace de tu lista copiado",
      description: "Compártelo con quien quieras",
      icon: Share2,
    });

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-surface px-6 py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sale-100">
          <Heart className="h-9 w-9 text-sale-500" />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-h3 text-text-primary">Tu lista de favoritos está vacía</h1>
          <p className="max-w-md text-body-lg text-text-secondary">
            Toca el corazón de cualquier producto para guardarlo aquí y no perderlo de vista.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/categoria/auriculares" variant="primary" size="lg">
            Explorar productos
          </ButtonLink>
          <ButtonLink href="/ofertas" variant="outline" size="lg">
            <Sparkles className="h-[18px] w-[18px]" /> Ver ofertas
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-h2 text-text-primary">Mis favoritos</h1>
          <p className="text-body text-text-secondary">
            {items.length} {items.length === 1 ? "artículo guardado" : "artículos guardados"} · Los precios se
            actualizan en tiempo real
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={share}>
            Compartir lista
          </Button>
          <Button variant="primary" onClick={addAll}>
            Agregar todo al carrito
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} showColors={false} />
        ))}
      </div>

      <p className="text-body-sm text-text-muted">
        Los artículos permanecen en tu lista durante 90 días. Te avisaremos cuando bajen de precio o queden
        pocas existencias.
      </p>
    </div>
  );
}
