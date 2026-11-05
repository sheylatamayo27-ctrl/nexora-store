import { BadgeCheck, Check, Headset, Lightbulb, ShieldCheck, X, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { RichText } from "@/components/content/RichText";
import type { ContentBlock, ContentIcon } from "@/data/types";
import { formatPrice, formatPriceShort } from "@/lib/format";
import { FREE_EXPRESS_THRESHOLD, SHIPPING_RATES, type ShippingMethod } from "@/lib/shipping";
import { cn } from "@/lib/utils";

const icons: Record<ContentIcon, LucideIcon> = {
  quality: BadgeCheck,
  service: Headset,
  innovation: Lightbulb,
  trust: ShieldCheck,
};

/**
 * Cuerpo de una página de contenido. Con `wide`, el texto corrido sigue en el
 * ancho de lectura (max-w-3xl) y las grillas (tarjetas, cifras) usan todo el ancho.
 */
export function ContentBlocks({ blocks, wide = false }: { blocks: ContentBlock[]; wide?: boolean }) {
  const prose = wide ? "max-w-3xl" : undefined;
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, i) => (
        <Block key={i} block={block} prose={prose} />
      ))}
    </div>
  );
}

function Block({ block, prose }: { block: ContentBlock; prose?: string }) {
  switch (block.type) {
    case "heading":
      return <h2 className={cn("pt-6 text-h4 text-text-primary first:pt-0", prose)}>{block.text}</h2>;
    case "paragraph":
      return (
        <p className={cn("text-body-lg text-text-secondary", prose)}>
          <RichText text={block.text} />
        </p>
      );
    case "list":
      return (
        <ul className={cn("flex flex-col gap-2.5", prose)}>
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-body-lg text-text-secondary">
              {block.tone === "check" ? (
                <Check className="mt-1 h-5 w-5 shrink-0 text-success-500" aria-hidden />
              ) : block.tone === "cross" ? (
                <X className="mt-1 h-5 w-5 shrink-0 text-sale-500" aria-hidden />
              ) : (
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
              )}
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className={cn("flex flex-col gap-5 py-2", prose)}>
          {block.items.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-label-lg text-brand-800">
                {i + 1}
              </span>
              <div className="flex flex-col gap-1 pt-2">
                <span className="text-label-lg text-text-primary">{step.title}</span>
                <span className="text-body text-text-secondary">
                  <RichText text={step.text} />
                </span>
              </div>
            </li>
          ))}
        </ol>
      );
    case "cards":
      return (
        <div className="grid grid-cols-4 gap-4 py-2 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {block.items.map((card) => {
            const Icon = icons[card.icon];
            return (
              <div key={card.title} className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-elevation-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-100 text-brand-800">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-label-lg text-text-primary">{card.title}</span>
                <span className="text-body-sm text-text-secondary">{card.text}</span>
              </div>
            );
          })}
        </div>
      );
    case "stats":
      return (
        <div className="grid grid-cols-3 gap-4 py-2 max-sm:grid-cols-1">
          {block.items.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface p-6 text-center shadow-elevation-sm"
            >
              <span className="text-h2 text-brand-800">{stat.value}</span>
              <span className="text-body text-text-secondary">{stat.label}</span>
            </div>
          ))}
        </div>
      );
    case "shippingRates":
      return <ShippingRates className={prose} />;
  }
}

// `title`: clave del namespace "checkout" (mismos nombres que al pagar); `time`: de "contentPage".
const rateRows: { id: ShippingMethod; title: "standardShipping" | "expressShipping" | "sameDay"; time: "standardTime" | "expressTime" | "sameDayTime" }[] = [
  { id: "standard", title: "standardShipping", time: "standardTime" },
  { id: "express", title: "expressShipping", time: "expressTime" },
  { id: "sameday", title: "sameDay", time: "sameDayTime" },
];

/** Tabla de métodos de envío con las tarifas y el umbral del exprés gratis de `src/lib/shipping.ts`. */
function ShippingRates({ className }: { className?: string }) {
  const t = useTranslations("contentPage");
  const tCheckout = useTranslations("checkout");
  const tCommon = useTranslations("common");
  return (
    <div className={cn("my-2 flex flex-col gap-3", className)}>
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <table className="w-full text-left">
          <thead className="bg-surface-subtle">
            <tr>
              <th scope="col" className="px-5 py-3 text-label-sm text-text-secondary max-sm:px-3">
                {t("method")}
              </th>
              <th scope="col" className="px-5 py-3 text-label-sm text-text-secondary max-sm:px-3">
                {t("deliveryTime")}
              </th>
              <th scope="col" className="px-5 py-3 text-right text-label-sm text-text-secondary max-sm:px-3">
                {t("cost")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rateRows.map((row) => {
              const price = SHIPPING_RATES[row.id];
              return (
                <tr key={row.id} className="border-t border-border">
                  <th scope="row" className="px-5 py-4 text-label text-text-primary max-sm:px-3">
                    {tCheckout(row.title)}
                  </th>
                  <td className="px-5 py-4 text-body text-text-secondary max-sm:px-3">{t(row.time)}</td>
                  <td
                    className={cn(
                      "whitespace-nowrap px-5 py-4 text-right text-label max-sm:px-3",
                      price ? "text-text-primary" : "text-success-500"
                    )}
                  >
                    {price ? formatPrice(price) : tCommon("free")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-body-sm text-text-secondary">
        {t("freeExpressNote", { amount: formatPriceShort(FREE_EXPRESS_THRESHOLD) })}
      </p>
    </div>
  );
}
