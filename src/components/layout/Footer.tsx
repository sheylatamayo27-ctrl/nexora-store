import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { FooterSection } from "@/components/layout/FooterSection";

const columns = [
  {
    title: "Comprar",
    links: ["Auriculares", "Audífonos", "Laptops", "Smartphones", "Accesorios"],
  },
  {
    title: "Atención al cliente",
    links: ["Centro de ayuda", "Rastrear pedido", "Devoluciones", "Envíos", "Garantía"],
  },
  {
    title: "Empresa",
    links: ["Nosotros", "Empleos", "Blog", "Contacto", "Privacidad"],
  },
];

const hours = ["Lun – Vie: 9:00 – 21:00", "Sábado: 10:00 – 20:00", "Domingo: 11:00 – 18:00"];
const socials = [Facebook, Instagram, Twitter, Youtube];
const payments = ["VISA", "Mastercard", "PayPal", "UPI", "COD"];

export function Footer() {
  return (
    <footer className="bg-brand-900 text-text-inverse">
      <div className="container-page pt-16 pb-28 md:pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:gap-12">
          {/* Marca */}
          <div className="flex flex-col gap-5">
            <Logo tone="light" />
            <p className="max-w-xs text-body text-white/70">
              Tu tienda de los últimos gadgets, audio y dispositivos inteligentes — con envío
              rápido y soporte real.
            </p>
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
                  aria-label="Red social"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <FooterSection key={col.title} title={col.title}>
              {col.links.map((l) => (
                <Link key={l} href="#" className="text-body text-white/65 transition-colors hover:text-white">
                  {l}
                </Link>
              ))}
            </FooterSection>
          ))}

          <FooterSection title="Horario">
            {hours.map((h) => (
              <span key={h} className="text-body text-white/65">
                {h}
              </span>
            ))}
          </FooterSection>
        </div>

        <div className="my-8 h-px bg-white/12" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-body-sm text-white/60">
            © 2026 Nexora Electronics. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-body-sm text-white/60">Aceptamos</span>
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
