"use client";

import { MapPin, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { AccountEmptyState } from "@/components/account/AccountEmptyState";
import { Button } from "@/components/ui/Button";
import { notifyToast } from "@/lib/toast";
// TODO: usar getAddresses() cuando el backend esté conectado.
import type { Address } from "@/services/account";

/**
 * Direcciones. Placeholder de front-end: siempre vacío y "Agregar" solo avisa.
 * Al conectar el backend, carga las direcciones (`Address[]`) con `getAddresses()`
 * de src/services/account.ts, lístalas aquí y abre su formulario desde `add`.
 */
export function AddressesView() {
  const t = useTranslations("addresses");
  const tCommon = useTranslations("common");
  const add = () =>
    notifyToast({
      title: tCommon("comingSoon"),
      description: t("toast"),
      icon: MapPin,
    });

  return (
    <AccountEmptyState
      icon={MapPin}
      title={t("emptyTitle")}
      description={t("emptyDescription")}
    >
      <Button variant="primary" size="lg" onClick={add}>
        <Plus className="h-[18px] w-[18px]" /> {t("add")}
      </Button>
    </AccountEmptyState>
  );
}
