"use client";

import { CreditCard, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { AccountEmptyState } from "@/components/account/AccountEmptyState";
import { Button } from "@/components/ui/Button";
import { notifyToast } from "@/lib/toast";
// TODO: usar getPaymentMethods() cuando el backend esté conectado.
import type { PaymentMethod } from "@/services/account";

/**
 * Métodos de pago. Placeholder de front-end: siempre vacío y "Agregar" solo
 * avisa. Al conectar la pasarela de pago, carga las tarjetas guardadas
 * (`PaymentMethod[]`) con `getPaymentMethods()` de src/services/account.ts,
 * lístalas aquí y abre su formulario desde `add`.
 */
export function PaymentMethodsView() {
  const t = useTranslations("payments");
  const tCommon = useTranslations("common");
  const add = () =>
    notifyToast({
      title: tCommon("comingSoon"),
      description: t("toast"),
      icon: CreditCard,
    });

  return (
    <AccountEmptyState
      icon={CreditCard}
      title={t("emptyTitle")}
      description={t("emptyDescription")}
    >
      <Button variant="primary" size="lg" onClick={add}>
        <Plus className="h-[18px] w-[18px]" /> {t("add")}
      </Button>
    </AccountEmptyState>
  );
}
