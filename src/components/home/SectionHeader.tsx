import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  /** Texto del enlace; por defecto "Ver todo". */
  linkLabel?: string;
}) {
  const t = useTranslations("common");
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-h3 text-text-primary sm:text-h2">{title}</h2>
        {subtitle && <p className="text-body text-text-secondary sm:text-body-lg">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="flex shrink-0 items-center gap-1.5 text-label text-brand-700 transition-colors hover:text-brand-800"
        >
          {linkLabel ?? t("viewAll")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
