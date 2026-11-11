import { Facebook, Instagram, Twitter, Youtube, type LucideIcon } from "lucide-react";

export const STORE_CONTACT = {
  address: "Parque Tecnológico 221B, CDMX",
  phone: "+52 55 9876 5432",
  phoneHref: "tel:+525598765432",
  email: "soporte@nexora.store",
} as const;

export const SOCIALS: { Icon: LucideIcon; label: string; href: string }[] = [
  { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: Twitter, label: "X (Twitter)", href: "https://x.com" },
  { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
];

export const STORE_HOURS = ["weekdays", "saturday", "sunday"] as const;
