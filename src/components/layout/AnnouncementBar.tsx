import { Truck, Zap, RotateCcw } from "lucide-react";

const messages = [
  { icon: Truck, text: "Envío gratis en pedidos superiores a $500" },
  { icon: Zap, text: "10% extra en tu primer pedido con el código NEXORA10" },
  { icon: RotateCcw, text: "Devoluciones sin complicaciones en 30 días" },
];

/** Un grupo con los tres mensajes (se repite para el desplazamiento continuo). */
function MessageGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex items-center" aria-hidden={ariaHidden}>
      {messages.map(({ icon: Icon, text }, i) => (
        <div key={i} className="flex items-center gap-2 whitespace-nowrap px-6">
          <Icon className="h-3.5 w-3.5 shrink-0 text-accent-500" />
          <span className="text-label-sm">{text}</span>
        </div>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
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
        {messages.map(({ icon: Icon, text }, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap">
            {i > 0 && <span className="mr-6 h-1 w-1 rounded-full bg-white/40" />}
            <Icon className="h-3.5 w-3.5 text-accent-500" />
            <span className="text-label-sm">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
