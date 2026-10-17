import Link from "next/link";
import {
  LayoutGrid,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Mail,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/utils";

type ActiveId = "dashboard" | "orders" | "wishlist" | "addresses" | "payments" | "notifications" | "settings";

const navItems: { id: ActiveId; label: string; href: string; icon: LucideIcon }[] = [
  { id: "dashboard", label: "Panel", href: "/cuenta", icon: LayoutGrid },
  { id: "orders", label: "Mis pedidos", href: "/cuenta", icon: Package },
  { id: "wishlist", label: "Favoritos", href: "/favoritos", icon: Heart },
  { id: "addresses", label: "Direcciones", href: "#", icon: MapPin },
  { id: "payments", label: "Métodos de pago", href: "#", icon: CreditCard },
  { id: "notifications", label: "Notificaciones", href: "#", icon: Mail },
  { id: "settings", label: "Configuración", href: "#", icon: Settings },
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
  return (
    <Container className="flex flex-col gap-6 py-8 lg:flex-row lg:gap-8">
      <aside className="flex w-full shrink-0 flex-col gap-4 lg:w-72">
        <Breadcrumb items={[{ label: "Mi cuenta" }, { label: crumb }]} />

        {/* Perfil */}
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-gradient-to-b from-brand-100 to-surface p-6 text-center">
          <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand-100 text-h3 text-brand-800">
            ST
          </span>
          <span className="text-label-lg text-text-primary">Sheyla Tamayo</span>
          <span className="text-body-sm text-text-secondary">sheyla@nexora.store</span>
          <span className="rounded-sm bg-accent-500 px-2 py-1 text-label-xs uppercase text-brand-900">
            Miembro Gold
          </span>
        </div>

        {/* Navegación */}
        <nav className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-surface p-3 no-scrollbar lg:flex-col">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-md px-4 py-3 text-label transition-colors",
                item.id === active
                  ? "bg-brand-100 text-brand-800"
                  : "text-text-primary hover:bg-surface-subtle"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
          <div className="my-1 hidden h-px bg-border lg:block" />
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 rounded-md px-4 py-3 text-label text-sale-500 hover:bg-surface-subtle"
          >
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </Link>
        </nav>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </Container>
  );
}
