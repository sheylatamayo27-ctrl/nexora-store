import type { Metadata } from "next";
import { AccountShell } from "@/components/account/AccountShell";
import { NotificationsView } from "@/components/account/NotificationsView";

export const metadata: Metadata = { title: "Notificaciones" };

export default function AccountNotificationsPage() {
  return (
    <AccountShell active="notifications" crumb="Notificaciones">
      <NotificationsView />
    </AccountShell>
  );
}
