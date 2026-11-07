import {
  LayoutGrid,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Mail,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { AccountProfile, SignOutButton } from "@/components/account/AccountProfile";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type ActiveId = "dashboard" | "orders" | "wishlist" | "addresses" | "payments" | "notifications" | "settings";

// El id es también la clave de su texto en "account". `desktopOnly`: no aparece
// en las pestañas de móvil/tablet (M09/T09 muestran 6).
const navItems: { id: ActiveId; href: string; icon: LucideIcon; desktopOnly?: boolean }[] = [
  { id: "dashboard", href: "/account", icon: LayoutGrid },
  { id: "orders", href: "/account", icon: Package },
  { id: "wishlist", href: "/wishlist", icon: Heart },
  { id: "addresses", href: "/account/addresses", icon: MapPin },
  { id: "payments", href: "/account/payments", icon: CreditCard },
  { id: "notifications", href: "/account/notifications", icon: Mail, desktopOnly: true },
  { id: "settings", href: "/account/settings", icon: Settings },
];

export function AccountShell({
  active,
  crumb,
  children,
}: {
  active: ActiveId;
  crumb: string;
  children: React.ReactNode;
}) {
  const t = useTranslations("account");
  return (
    <Container className="flex flex-col gap-6 py-8 lg:flex-row lg:gap-8">
      {/* <lg (M09/T09): banda blanca a todo el ancho con el perfil horizontal y
          las pestañas en chips; sin migas de pan. Escritorio: columna lateral intacta. */}
      <aside aria-label={t("myAccount")} className="flex w-full shrink-0 flex-col gap-4 max-lg:-mx-4 max-lg:-mt-8 max-lg:w-auto max-lg:border-b max-lg:border-border max-lg:bg-surface max-lg:px-4 max-lg:pb-4 max-lg:pt-4 sm:max-lg:-mx-6 sm:max-lg:px-6 md:max-lg:pt-5 lg:w-72">
        <Breadcrumb items={[{ label: t("myAccount") }, { label: crumb }]} className="max-lg:hidden" />

        {/* Perfil (datos de la sesión) */}
        <AccountProfile />

        {/* Navegación — <lg: chips con scroll horizontal que arranca en el margen
            (móvil con ícono; tablet sin ícono para que quepan las 6). */}
        <nav aria-label={t("accountMenu")} className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-surface p-3 no-scrollbar max-lg:-mx-4 max-lg:gap-2 max-lg:rounded-none max-lg:border-0 max-lg:bg-transparent max-lg:px-4 max-lg:py-0 sm:max-lg:-mx-6 sm:max-lg:px-6 lg:flex-col">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-md px-4 py-3 text-label transition-colors",
                "max-lg:gap-1.5 max-lg:border max-lg:px-3 max-lg:py-2 max-lg:text-label-sm md:max-lg:px-3.5 md:max-lg:py-2.5 md:max-lg:text-label",
                item.id === active
                  ? "bg-brand-100 text-brand-800 max-lg:border-brand-800"
                  : "text-text-primary hover:bg-surface-subtle max-lg:border-border-strong max-lg:bg-surface",
                item.desktopOnly && "max-lg:hidden"
              )}
            >
              <item.icon className="h-5 w-5 max-md:h-4 max-md:w-4 md:max-lg:hidden" />
              {t(item.id)}
            </Link>
          ))}
          <div className="my-1 hidden h-px bg-border lg:block" />
          <SignOutButton />
        </nav>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </Container>
  );
}
