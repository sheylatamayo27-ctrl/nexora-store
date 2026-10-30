"use client";

import { CreditCard, Plus } from "lucide-react";
import { AccountEmptyState } from "@/components/account/AccountEmptyState";
import { Button } from "@/components/ui/Button";
import { notifyToast } from "@/lib/toast";

/**
 * Métodos de pago. Placeholder de front-end: siempre vacío y "Agregar" solo
 * avisa. Al conectar la pasarela de pago, lista aquí las tarjetas guardadas y
 * abre su formulario desde `add`.
 */
export function PaymentMethodsView() {
  const add = () =>
    notifyToast({
      title: "Próximamente",
      description: "Pronto podrás guardar tus tarjetas aquí",
      icon: CreditCard,
    });

  return (
    <AccountEmptyState
      icon={CreditCard}
      title="No tienes métodos de pago guardados"
      description="Guarda una tarjeta para pagar más rápido en tu próxima compra."
    >
      <Button variant="primary" size="lg" onClick={add}>
        <Plus className="h-[18px] w-[18px]" /> Agregar método de pago
      </Button>
    </AccountEmptyState>
  );
}
