import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { CardSkeletons, SectionHeaderSkeleton, SkeletonRegion, onDark } from "@/components/skeletons/blocks";
import { cn } from "@/lib/utils";

export default function LoadingOffers() {
  return (
    <SkeletonRegion className="flex flex-col">
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-500">
        <Container className="flex flex-col gap-6 py-16 max-sm:py-12">
          <Skeleton className={cn("h-8 w-56 rounded-full", onDark)} />
          <Skeleton className={cn("h-14 w-80 max-w-full max-sm:h-10", onDark)} />
          <div className="flex flex-col gap-2">
            <Skeleton variant="text" className={cn("w-[36rem] max-w-full", onDark)} />
            <Skeleton variant="text" className={cn("w-48", onDark)} />
          </div>
          <div className="flex flex-wrap items-end gap-6">
            <div className="flex gap-3">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className={cn("h-14 w-14", onDark)} />
              ))}
            </div>
            <Skeleton className={cn("h-12 w-24", onDark)} />
            <Skeleton className={cn("h-12 w-32", onDark)} />
          </div>
        </Container>
      </section>

      <section className="py-16 max-sm:py-12">
        <Container className="flex flex-col gap-6">
          <SectionHeaderSkeleton subtitle={false} link={false} />
          <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-border bg-surface p-4">
                <Skeleton className="h-24 w-24 shrink-0" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton variant="text" className="w-full" />
                  <Skeleton variant="title" className="w-24" />
                  <Skeleton className="h-1.5 w-full rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-16 max-sm:py-12">
        <Container className="flex flex-col gap-6">
          <SectionHeaderSkeleton subtitle={false} link={false} />
          <div className="grid grid-cols-5 gap-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
            <CardSkeletons count={12} />
          </div>
        </Container>
      </section>
    </SkeletonRegion>
  );
}
