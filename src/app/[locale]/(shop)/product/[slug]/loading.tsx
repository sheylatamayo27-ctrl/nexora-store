import { useTranslations } from "next-intl";
import { Dots } from "@/components/ui/Dots";

export default function LoadingProduct() {
  const t = useTranslations("product");
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5">
      <Dots size="lg" />
      <span className="text-label text-text-secondary">{t("loading")}</span>
    </div>
  );
}
