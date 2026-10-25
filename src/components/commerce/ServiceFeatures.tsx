import { Truck, ShieldCheck, Headset, RotateCcw } from "lucide-react";
import { Container } from "@/components/ui/Container";

const serviceFeatures = [
  { icon: Truck, title: "Envío gratis", desc: "En pedidos superiores a $500" },
  { icon: ShieldCheck, title: "Pago seguro", desc: "Checkout 100% protegido" },
  { icon: Headset, title: "Soporte 24/7", desc: "Ayuda dedicada, siempre" },
  { icon: RotateCcw, title: "Devoluciones fáciles", desc: "Política de 30 días" },
];

/** Barra de beneficios (envío, pago, soporte, devoluciones). Compartida por home,
 *  categoría y detalle de producto; se sitúa justo encima del pie de página. */
export function ServiceFeatures() {
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
                <span className="text-label-lg text-text-primary">{f.title}</span>
                <span className="text-body-sm text-text-secondary">{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
