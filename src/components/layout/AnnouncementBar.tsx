import { Truck, Zap, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { formatPriceShort } from "@/lib/format";
import { FREE_EXPRESS_THRESHOLD } from "@/lib/shipping";

const messages = [
  { icon: Truck, key: "freeShipping" },
  { icon: Zap, key: "firstOrder" },
  { icon: RotateCcw, key: "returns" },
] as const;

/** Texto de un mensaje; el de envío lleva el umbral de la regla de envío. */
function useMessageText() {
  const t = useTranslations("announcement");
  return (key: (typeof messages)[number]["key"]) =>
    key === "freeShipping" ? t(key, { amount: formatPriceShort(FREE_EXPRESS_THRESHOLD) }) : t(key);
}

/** Un grupo con los tres mensajes (se repite para el desplazamiento continuo). */
function MessageGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  const text = useMessageText();
  return (
    <div className="flex items-center" aria-hidden={ariaHidden}>
      {messages.map(({ icon: Icon, key }, i) => (
        <div key={i} className="flex items-center gap-2 whitespace-nowrap px-6">
          <Icon className="h-3.5 w-3.5 shrink-0 text-accent-500" />
          <span className="text-label-sm">{text(key)}</span>
        </div>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
  const text = useMessageText();
  return (
    <div className="bg-brand-900 text-text-inverse">
      {/* Móvil y tablet: franja en desplazamiento continuo (marquee). */}
      <div className="overflow-hidden py-2 lg:hidden">
        <div className="flex w-max animate-marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <MessageGroup key={i} ariaHidden={i > 0} />
          ))}
        </div>
      </div>

      {/* Escritorio: mensajes fijos y centrados. */}
      <div className="container-page hidden items-center justify-center gap-6 overflow-hidden py-2 lg:flex">
        {messages.map(({ icon: Icon, key }, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap">
            {i > 0 && <span className="mr-6 h-1 w-1 rounded-full bg-white/40" />}
            <Icon className="h-3.5 w-3.5 text-accent-500" />
            <span className="text-label-sm">{text(key)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
