import type { Metadata } from "next";
import { AccountShell } from "@/components/account/AccountShell";
import { PaymentMethodsView } from "@/components/account/PaymentMethodsView";

export const metadata: Metadata = { title: "Métodos de pago" };

export default function AccountPaymentsPage() {
  return (
    <AccountShell active="payments" crumb="Métodos de pago">
      <PaymentMethodsView />
    </AccountShell>
  );
}
