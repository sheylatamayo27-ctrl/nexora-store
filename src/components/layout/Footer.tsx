import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/Logo";
import { FooterSection } from "@/components/layout/FooterSection";
import { Link } from "@/i18n/navigation";

// `title` y `key`: textos en el namespace "footer". href "#": página pendiente
// de completar por el comprador (ver README).
const columns = [
  {
    title: "shop",
    links: [
      { key: "headphones", href: "/category/headphones" },
      { key: "earbuds", href: "/category/earbuds" },
      { key: "laptops", href: "/category/laptops" },
      { key: "smartphones", href: "/category/smartphones" },
      { key: "accessories", href: "/category/accessories" },
    ],
  },
  {
    title: "customerService",
    links: [
      { key: "helpCenter", href: "#" },
      { key: "trackOrder", href: "/account" },
      { key: "returns", href: "#" },
      { key: "shipping", href: "#" },
      { key: "warranty", href: "#" },
    ],
  },
  {
    title: "company",
    links: [
      { key: "about", href: "#" },
      { key: "careers", href: "#" },
      { key: "blog", href: "/blog" },
      { key: "contact", href: "#" },
      { key: "privacy", href: "#" },
    ],
  },
] as const;

const hours = ["weekdays", "saturday", "sunday"] as const;
// Redes sociales: href "#" pendiente de completar por el comprador (ver README).
const socials = [Facebook, Instagram, Twitter, Youtube];
// Marcas de medios de pago: no se traducen.
const payments = ["VISA", "Mastercard", "PayPal", "UPI", "COD"];

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-brand-900 text-text-inverse">
      {/* En móvil, si la página tiene una barra fija abajo ([data-fixed-bar], 81px +
          área segura), se reserva su alto para que no tape el final del footer. */}
      <div className="container-page pt-16 pb-16 max-md:[body:has([data-fixed-bar])_&]:pb-[calc(9rem+env(safe-area-inset-bottom))]">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:gap-12">
          {/* Marca */}
          <div className="flex flex-col gap-5">
            <Logo tone="light" />
            <p className="max-w-xs text-body text-white/70">{t("tagline")}</p>
            {/* Datos de contacto: nombres propios, iguales en todos los idiomas. */}
            <div className="flex flex-col gap-3 text-body text-white/85">
              <span className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent-500" /> Parque Tecnológico 221B, CDMX
              </span>
              <span className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent-500" /> +52 55 9876 5432
              </span>
              <span className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent-500" /> soporte@nexora.store
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              {socials.map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  aria-label={t("socialLink")}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <FooterSection key={col.title} title={t(col.title)}>
              {col.links.map((l) => (
                <Link key={l.key} href={l.href} className="text-body text-white/65 transition-colors hover:text-white">
                  {t(l.key)}
                </Link>
              ))}
            </FooterSection>
          ))}

          <FooterSection title={t("hours")}>
            {hours.map((h) => (
              <span key={h} className="text-body text-white/65">
                {t(h)}
              </span>
            ))}
          </FooterSection>
        </div>

        <div className="my-8 h-px bg-white/12" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-body-sm text-white/60">{t("copyright")}</p>
          <div className="flex items-center gap-2 max-[339px]:flex-wrap max-[339px]:justify-center">
            <span className="text-body-sm text-white/60">{t("weAccept")}</span>
            {payments.map((p) => (
              <span key={p} className="rounded-sm bg-surface px-2 py-1 text-label-xs text-brand-900">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
