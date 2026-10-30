import type { Metadata } from "next";
import { AccountShell } from "@/components/account/AccountShell";
import { SettingsView } from "@/components/account/SettingsView";

export const metadata: Metadata = { title: "Configuración" };

export default function AccountSettingsPage() {
  return (
    <AccountShell active="settings" crumb="Configuración">
      <SettingsView />
    </AccountShell>
  );
}
