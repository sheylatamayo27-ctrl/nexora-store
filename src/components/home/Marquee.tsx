import { Zap } from "lucide-react";
import { useTranslations } from "next-intl";

/** Franja animada de ofertas (desplazamiento continuo). */
export function Marquee() {
  const t = useTranslations("marquee");
  const item = (
    <span className="flex items-center gap-3 px-6">
      <Zap className="h-4 w-4 shrink-0 text-accent-500" />
      <span className="text-label-lg text-text-inverse">{t("title")}</span>
      <span className="text-body text-white/75">{t("cta")}</span>
    </span>
  );

  return (
    <div className="overflow-hidden bg-gradient-to-r from-brand-800 via-brand-500 to-brand-800 py-4">
      <div className="flex w-max animate-marquee">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    </div>
  );
}
