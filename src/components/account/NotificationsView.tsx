import { Mail, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { AccountEmptyState } from "@/components/account/AccountEmptyState";
import { ButtonLink } from "@/components/ui/Button";
// TODO: usar getNotifications() cuando el backend esté conectado.
import type { Notification } from "@/services/account";

/**
 * Notificaciones. Placeholder de front-end: siempre vacío hasta conectar el
 * backend; entonces carga la lista (`Notification[]`) con `getNotifications()`
 * de src/services/account.ts y píntala aquí.
 */
export function NotificationsView() {
  const t = useTranslations("notifications");
  return (
    <AccountEmptyState
      icon={Mail}
      title={t("emptyTitle")}
      description={t("emptyDescription")}
    >
      <ButtonLink href="/account" variant="primary" size="lg">
        {t("viewOrders")}
      </ButtonLink>
      <ButtonLink href="/wishlist" variant="outline" size="lg">
        <Heart className="h-[18px] w-[18px]" /> {t("viewWishlist")}
      </ButtonLink>
    </AccountEmptyState>
  );
}
