import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Carrito", "Información", "Envío", "Pago"];

export function CheckoutSteps({ current = 1 }: { current?: number }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && (
              <span className={cn("h-0.5 w-6 sm:w-10", i <= current ? "bg-brand-800" : "bg-border-strong")} />
            )}
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-label-sm",
                done && "bg-brand-800 text-white",
                active && "border-2 border-brand-800 text-brand-800",
                !done && !active && "bg-surface-muted text-text-muted"
              )}
            >
              {done ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={cn(
                "hidden text-label-sm sm:block",
                active ? "text-text-primary" : "text-text-secondary"
              )}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
