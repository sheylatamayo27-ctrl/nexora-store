"use client";

import { MapPin, Plus } from "lucide-react";
import { AccountEmptyState } from "@/components/account/AccountEmptyState";
import { Button } from "@/components/ui/Button";
import { notifyToast } from "@/lib/toast";

/**
 * Direcciones. Placeholder de front-end: siempre vacío y "Agregar" solo avisa.
 * Al conectar el backend, lista aquí las direcciones y abre su formulario desde `add`.
 */
export function AddressesView() {
  const add = () =>
    notifyToast({
      title: "Próximamente",
      description: "Pronto podrás guardar tus direcciones aquí",
      icon: MapPin,
    });

  return (
    <AccountEmptyState
      icon={MapPin}
      title="No tienes direcciones guardadas"
      description="Guarda una dirección de envío para no tener que escribirla en cada pedido."
    >
      <Button variant="primary" size="lg" onClick={add}>
        <Plus className="h-[18px] w-[18px]" /> Agregar dirección
      </Button>
    </AccountEmptyState>
  );
}
