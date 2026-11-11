import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ArrowButton } from "@/components/ui/CarouselArrows";
import { Link } from "@/i18n/navigation";

export function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel,
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
}) {
  const t = useTranslations("common");
  const arrows = onPrev !== undefined || onNext !== undefined;
  const link = href && (
    <Link
      href={href}
      className="flex shrink-0 items-center gap-1.5 text-label text-brand-700 transition-colors hover:text-brand-800"
    >
      {linkLabel ?? t("viewAll")}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-h3 text-text-primary sm:text-h2">{title}</h2>
        {subtitle && <p className="text-body text-text-secondary sm:text-body-lg">{subtitle}</p>}
      </div>
      {arrows ? (
        <div className="flex shrink-0 items-center gap-4">
          <div className="hidden items-center gap-2 lg:flex">
            <ArrowButton direction="prev" size="sm" onClick={onPrev} disabled={!onPrev || !canPrev} />
            <ArrowButton direction="next" size="sm" onClick={onNext} disabled={!onNext || !canNext} />
          </div>
          {link}
        </div>
      ) : (
        link
      )}
    </div>
  );
}
