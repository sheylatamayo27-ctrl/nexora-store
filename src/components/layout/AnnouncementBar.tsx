import { Truck, Zap, RotateCcw } from "lucide-react";

const messages = [
  { icon: Truck, text: "Envío gratis en pedidos superiores a $500" },
  { icon: Zap, text: "10% extra en tu primer pedido con el código NEXORA10" },
  { icon: RotateCcw, text: "Devoluciones sin complicaciones en 30 días" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-brand-900 text-text-inverse">
      <div className="container-page flex items-center justify-center gap-6 overflow-hidden py-2">
        {messages.map(({ icon: Icon, text }, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap">
            {i > 0 && <span className="mr-6 hidden h-1 w-1 rounded-full bg-white/40 sm:block" />}
            <Icon className="h-3.5 w-3.5 text-accent-500" />
            <span className="text-label-sm">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
