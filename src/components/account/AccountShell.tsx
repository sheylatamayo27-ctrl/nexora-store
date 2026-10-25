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

// `desktopOnly`: no aparece en las pestañas de móvil/tablet (M09/T09 muestran 6).
const navItems: { id: ActiveId; label: string; href: string; icon: LucideIcon; desktopOnly?: boolean }[] = [
  { id: "dashboard", label: "Panel", href: "/cuenta", icon: LayoutGrid },
  { id: "orders", label: "Mis pedidos", href: "/cuenta", icon: Package },
  { id: "wishlist", label: "Favoritos", href: "/favoritos", icon: Heart },
  { id: "addresses", label: "Direcciones", href: "#", icon: MapPin },
  { id: "payments", label: "Métodos de pago", href: "#", icon: CreditCard },
  { id: "notifications", label: "Notificaciones", href: "#", icon: Mail, desktopOnly: true },
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
      {/* <lg (M09/T09): banda blanca a todo el ancho con el perfil horizontal y
          las pestañas en chips; sin migas de pan. Escritorio: columna lateral intacta. */}
      <aside className="flex w-full shrink-0 flex-col gap-4 max-lg:-mx-4 max-lg:-mt-8 max-lg:w-auto max-lg:border-b max-lg:border-border max-lg:bg-surface max-lg:px-4 max-lg:pb-4 max-lg:pt-4 sm:max-lg:-mx-6 sm:max-lg:px-6 md:max-lg:pt-5 lg:w-72">
        <Breadcrumb items={[{ label: "Mi cuenta" }, { label: crumb }]} className="max-lg:hidden" />

        {/* Perfil */}
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-gradient-to-b from-brand-100 to-surface p-6 text-center max-lg:flex-row max-lg:gap-3 max-lg:rounded-none max-lg:border-0 max-lg:bg-none max-lg:p-0 max-lg:text-left md:max-lg:gap-4">
          <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand-100 text-h3 text-brand-800 max-lg:shrink-0 max-md:h-12 max-md:w-12 max-md:text-label-lg md:max-lg:h-14 md:max-lg:w-14 md:max-lg:text-h4">
            ST
          </span>
          {/* lg:contents: en escritorio los hijos siguen siendo ítems directos de la tarjeta. */}
          <div className="contents max-lg:flex max-lg:min-w-0 max-lg:flex-col max-lg:gap-0.5">
            <div className="contents max-lg:flex max-lg:items-center max-lg:gap-2">
              <span className="text-label-lg text-text-primary max-lg:truncate max-lg:font-semibold">Sheyla Tamayo</span>
              <span className="shrink-0 rounded-sm bg-accent-500 px-1.5 py-0.5 text-label-xs uppercase text-brand-900 lg:hidden">
                Gold
              </span>
            </div>
            <span className="text-body-sm text-text-secondary max-lg:truncate">sheyla@nexora.store</span>
          </div>
          <span className="rounded-sm bg-accent-500 px-2 py-1 text-label-xs uppercase text-brand-900 max-lg:hidden">
            Miembro Gold
          </span>
        </div>

        {/* Navegación — <lg: chips con scroll horizontal que arranca en el margen
            (móvil con ícono; tablet sin ícono para que quepan las 6). */}
        <nav className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-surface p-3 no-scrollbar max-lg:-mx-4 max-lg:gap-2 max-lg:rounded-none max-lg:border-0 max-lg:bg-transparent max-lg:px-4 max-lg:py-0 sm:max-lg:-mx-6 sm:max-lg:px-6 lg:flex-col">
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
              {item.label}
            </Link>
          ))}
          <div className="my-1 hidden h-px bg-border lg:block" />
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 rounded-md px-4 py-3 text-label text-sale-500 hover:bg-surface-subtle max-lg:hidden"
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
