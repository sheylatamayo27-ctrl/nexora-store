import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { CardSkeletons, PageHeaderSkeleton, SkeletonRegion } from "@/components/skeletons/blocks";

/** Categoría: cabecera con chips, filtros laterales (escritorio) y cuadrícula de productos. */
export default function LoadingCategory() {
  return (
    <SkeletonRegion className="flex flex-col">
      <PageHeaderSkeleton>
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} className="h-11 w-24 shrink-0" />
          ))}
        </div>
      </PageHeaderSkeleton>

      <Container className="flex gap-8 py-8">
        <aside className="w-72 shrink-0 max-lg:hidden">
          <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <Skeleton variant="title" className="w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton variant="text" className="w-24" />
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 shrink-0 rounded-sm" />
                <Skeleton variant="text" className={i % 3 ? "w-24" : "w-32"} />
              </div>
            ))}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="flex items-center justify-between gap-3 max-md:hidden">
            <Skeleton variant="text" className="w-40" />
            <div className="flex gap-2">
              <Skeleton className="h-11 w-44" />
              <Skeleton className="h-10 w-10 max-sm:hidden" />
              <Skeleton className="h-10 w-10 max-sm:hidden" />
            </div>
          </div>
          <div className="hidden gap-3 max-md:flex">
            <Skeleton className="h-11 flex-1" />
            <Skeleton className="h-11 flex-1" />
          </div>
          <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-3">
            <CardSkeletons count={12} />
          </div>
        </div>
      </Container>
    </SkeletonRegion>
  );
}
