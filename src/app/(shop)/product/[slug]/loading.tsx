import { Dots } from "@/components/ui/Dots";

export default function LoadingProduct() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5">
      <Dots size="lg" />
      <span className="text-label text-text-secondary">Cargando producto…</span>
    </div>
  );
}
