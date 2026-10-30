import { Mail, Heart } from "lucide-react";
import { AccountEmptyState } from "@/components/account/AccountEmptyState";
import { ButtonLink } from "@/components/ui/Button";

/** Notificaciones. Placeholder de front-end: siempre vacío hasta conectar el backend. */
export function NotificationsView() {
  return (
    <AccountEmptyState
      icon={Mail}
      title="No tienes notificaciones"
      description="Aquí verás los avisos de tus pedidos y cuando bajen de precio tus favoritos."
    >
      <ButtonLink href="/account" variant="primary" size="lg">
        Ver mis pedidos
      </ButtonLink>
      <ButtonLink href="/wishlist" variant="outline" size="lg">
        <Heart className="h-[18px] w-[18px]" /> Ver favoritos
      </ButtonLink>
    </AccountEmptyState>
  );
}
