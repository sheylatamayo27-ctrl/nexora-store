import type { Metadata } from "next";
import { AccountShell } from "@/components/account/AccountShell";
import { AddressesView } from "@/components/account/AddressesView";

export const metadata: Metadata = { title: "Direcciones" };

export default function AccountAddressesPage() {
  return (
    <AccountShell active="addresses" crumb="Direcciones">
      <AddressesView />
    </AccountShell>
  );
}
