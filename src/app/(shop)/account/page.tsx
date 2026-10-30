import type { Metadata } from "next";
import { AccountShell } from "@/components/account/AccountShell";
import { OrdersView } from "@/components/account/OrdersView";

export const metadata: Metadata = { title: "Mis pedidos" };

export default function AccountOrdersPage() {
  return (
    <AccountShell active="orders" crumb="Pedidos">
      <OrdersView />
    </AccountShell>
  );
}
