"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Heart, ShoppingBag, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { AssetImage } from "@/components/media/AssetImage";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/commerce/Price";
import { QuantityStepper } from "@/components/commerce/QuantityStepper";
import { Rating } from "@/components/commerce/Rating";
import { usePathname } from "@/i18n/navigation";
import { cartToast, favoriteToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useFavorites } from "@/store/favorites";
import type { Product } from "@/data/types";

const MAX_QTY = 10;

/**
 * Vista rápida de un producto (la abre "Vista rápida" de `ProductCard`).
 * Radix Dialog aporta el foco atrapado y devuelto, Esc, clic fuera y el bloqueo
 * de scroll; framer-motion, la entrada/salida (fade + escala; solo fade con
 * movimiento reducido). El color elegido solo marca el círculo y viaja al carrito.
 */
export function QuickView({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("quickView");
  const tCommon = useTranslations("common");
  const reduceMotion = useReducedMotion();
  const add = useCart((s) => s.add);
  const toggleFavorite = useFavorites((s) => s.toggle);
  // Se monta tras un clic (ya hidratado), así que puede leer favoritos sin esperar.
  const wished = useFavorites((s) => s.items.some((p) => p.id === product.id));
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product.colors?.[0]?.name);

  // Cada apertura empieza de cero (cantidad 1, primer color).
  useEffect(() => {
    if (!open) return;
    setQty(1);
    setColor(product.colors?.[0]?.name);
  }, [open, product]);

  // Cualquier cambio de ruta (enlace, atrás) cierra el modal.
  const pathname = usePathname();
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    onOpenChange(false);
  }, [pathname, onOpenChange]);

  // Radix solo devuelve el foco a un <Dialog.Trigger>; el modal se abre desde el
  // botón de la tarjeta, así que se recuerda el elemento enfocado al abrir (como en `Modal`).
  const returnFocus = useRef<HTMLElement | null>(null);

  const handleAdd = () => {
    add(product, { qty, color });
    cartToast(product);
    onOpenChange(false);
  };

  const description = product.shortDescription ?? t("descriptionFallback", { name: product.name });
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[70] bg-brand-900/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            {/* El centrado va en un contenedor propio: framer-motion escribe el transform del contenido. */}
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 max-sm:p-3">
              <Dialog.Content
                asChild
                forceMount
                onOpenAutoFocus={() => {
                  returnFocus.current = document.activeElement as HTMLElement | null;
                }}
                onCloseAutoFocus={(event) => {
                  event.preventDefault();
                  returnFocus.current?.focus({ preventScroll: true });
                }}
              >
                <motion.div
                  className="relative flex max-h-[min(90vh,calc(100vh-2rem))] w-[95vw] max-w-2xl flex-col overflow-y-auto rounded-2xl bg-surface shadow-elevation-lg focus:outline-none"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 4 }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.25, ease }}
                >
                  <Dialog.Close
                    aria-label={tCommon("close")}
                    className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-text-secondary shadow-elevation-sm backdrop-blur transition-colors hover:bg-surface-subtle hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
                  >
                    <X className="h-5 w-5" />
                  </Dialog.Close>

                  <div className="grid grid-cols-2 gap-6 p-6 max-sm:grid-cols-1 max-sm:gap-4 max-sm:p-4">
                    {/* Imagen */}
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-subtle">
                      <AssetImage
                        folder="products"
                        name={product.image}
                        alt={product.name}
                        sizes="(max-width: 640px) 90vw, 320px"
                      />
                      {product.badge && (
                        <Badge type={product.badge.type} className="absolute left-3 top-3 shadow-elevation-sm">
                          {product.badge.label}
                        </Badge>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex min-w-0 flex-col gap-3">
                      <span className="text-label-sm uppercase tracking-wide text-text-muted">{product.vendor}</span>
                      <Dialog.Title className="pr-8 text-h3 text-text-primary max-sm:pr-0">{product.name}</Dialog.Title>
                      <Rating rating={product.rating} reviews={product.reviews} />
                      <Price price={product.price} compareAt={product.compareAt} />
                      <Dialog.Description className="text-body-sm text-text-secondary">{description}</Dialog.Description>

                      {product.colors && product.colors.length > 0 && (
                        <div className="flex flex-col gap-2">
                          <span className="text-body-sm text-text-secondary">
                            {tCommon("colorValue", { color: color ?? product.colors[0].name })}
                          </span>
                          <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label={t("color")}>
                            {product.colors.map((c) => (
                              <button
                                key={c.name}
                                type="button"
                                role="radio"
                                aria-checked={c.name === color}
                                aria-label={c.name}
                                title={c.name}
                                onClick={() => setColor(c.name)}
                                className={cn(
                                  "h-7 w-7 rounded-full ring-1 ring-black/10 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                                  c.name === color && "ring-2 ring-brand-800 ring-offset-2"
                                )}
                                style={{ backgroundColor: c.hex }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col items-start gap-2">
                        <span className="text-body-sm text-text-secondary">{t("quantity")}</span>
                        <QuantityStepper value={qty} onChange={setQty} size="sm" min={1} max={MAX_QTY} />
                      </div>

                      <div className="mt-auto flex flex-col gap-2 pt-2">
                        <div className="flex gap-2">
                          <Button variant="primary" fullWidth onClick={handleAdd} className="flex-1">
                            <ShoppingBag className="h-[18px] w-[18px]" />
                            {tCommon("addToCart")}
                          </Button>
                          <button
                            type="button"
                            aria-label={wished ? tCommon("removeFromWishlist") : tCommon("saveToWishlist")}
                            aria-pressed={wished}
                            onClick={() => favoriteToast(product, toggleFavorite(product))}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border-strong transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
                          >
                            <Heart
                              className={cn(
                                "h-5 w-5 transition-colors",
                                wished ? "fill-sale-500 text-sale-500" : "text-text-primary"
                              )}
                            />
                          </button>
                        </div>
                        <ButtonLink
                          href={`/product/${product.slug}`}
                          variant="outline"
                          fullWidth
                          onClick={() => onOpenChange(false)}
                        >
                          {t("viewDetails")}
                          <ArrowRight className="h-4 w-4" />
                        </ButtonLink>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
