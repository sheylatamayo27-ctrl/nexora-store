import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { SkeletonRegion } from "@/components/skeletons/blocks";

/** Pedido confirmado: tarjeta de agradecimiento con el seguimiento y los detalles. */
export default function LoadingOrderConfirmation() {
  return (
    <SkeletonRegion>
      <Container className="flex flex-col gap-6 py-12 max-sm:py-8">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-12 max-sm:p-8">
          <Skeleton variant="circle" className="h-20 w-20" />
          <Skeleton className="h-11 w-72 max-w-full" />
          <div className="flex w-full flex-col items-center gap-2">
            <Skeleton variant="text" className="w-[26rem] max-w-full" />
            <Skeleton variant="text" className="w-52" />
          </div>
          <Skeleton className="h-9 w-40 rounded-full" />

          {/* Seguimiento: en línea en escritorio/tablet, en columna en móvil. */}
          <div className="mt-4 flex w-full max-w-2xl items-start justify-between max-md:mt-2 max-md:flex-col max-md:gap-5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2 max-md:flex-row max-md:gap-3">
                <Skeleton variant="circle" className="h-8 w-8 shrink-0" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[1.6fr_1fr] gap-6 max-lg:grid-cols-1">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-8 max-sm:p-6">
            <Skeleton variant="title" className="w-48" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 shrink-0" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton variant="text" className="w-3/4" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton variant="text" className="w-24 shrink-0" />
            </div>
            <div className="h-px bg-border" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex justify-between">
                <Skeleton variant="text" className="w-24" />
                <Skeleton variant="text" className="w-20" />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-8 max-sm:p-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-3.5">
                <Skeleton variant="circle" className="h-10 w-10 shrink-0" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton variant="text" className="w-36" />
                  <Skeleton className="h-3 w-44" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </SkeletonRegion>
  );
}
