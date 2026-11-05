import { Truck, ShieldCheck, Headset, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { formatPriceShort } from "@/lib/format";
import { FREE_EXPRESS_THRESHOLD } from "@/lib/shipping";

const serviceFeatures = [
  { icon: Truck, title: "freeShipping", desc: "freeShippingDesc" },
  { icon: ShieldCheck, title: "securePayment", desc: "securePaymentDesc" },
  { icon: Headset, title: "support", desc: "supportDesc" },
  { icon: RotateCcw, title: "returns", desc: "returnsDesc" },
] as const;

/** Barra de beneficios (envío, pago, soporte, devoluciones). Compartida por home,
 *  categoría y detalle de producto; se sitúa justo encima del pie de página. */
export function ServiceFeatures() {
  const t = useTranslations("services");
  return (
    <section className="border-y border-border bg-surface py-10">
      <Container>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {serviceFeatures.map((f) => (
            // ≤339px: ícono encima del texto para que "Devoluciones" quepa sin desbordar.
            <div
              key={f.title}
              className="flex items-center gap-4 max-[339px]:flex-col max-[339px]:items-start max-[339px]:gap-2"
            >
              <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-brand-100">
                <f.icon className="h-6 w-6 text-brand-800" />
              </span>
              <div className="flex flex-col">
                <span className="text-label-lg text-text-primary">{t(f.title)}</span>
                <span className="text-body-sm text-text-secondary">{f.desc === "freeShippingDesc" ? t(f.desc, { amount: formatPriceShort(FREE_EXPRESS_THRESHOLD) }) : t(f.desc)}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
