import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/Logo";
import { FooterSection } from "@/components/layout/FooterSection";
import { SOCIALS, STORE_CONTACT, STORE_HOURS } from "@/components/layout/store-info";
import { Link } from "@/i18n/navigation";

// `title` y `key`: textos en el namespace "footer".
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
      { key: "helpCenter", href: "/faq" },
      { key: "trackOrder", href: "/track-order" },
      { key: "returns", href: "/returns" },
      { key: "shipping", href: "/shipping" },
      { key: "warranty", href: "/warranty" },
    ],
  },
  {
    title: "company",
    links: [
      { key: "about", href: "/about" },
      // Sin página de empleos: "Nosotros" invita a escribir por el formulario de contacto.
      { key: "careers", href: "/about" },
      { key: "blog", href: "/blog" },
      { key: "contact", href: "/contact" },
      { key: "privacy", href: "/privacy" },
    ],
  },
] as const;

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
                <MapPin className="h-4 w-4 text-accent-500" /> {STORE_CONTACT.address}
              </span>
              <span className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent-500" /> {STORE_CONTACT.phone}
              </span>
              <span className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent-500" /> {STORE_CONTACT.email}
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  aria-label={label}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
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
            {STORE_HOURS.map((h) => (
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
