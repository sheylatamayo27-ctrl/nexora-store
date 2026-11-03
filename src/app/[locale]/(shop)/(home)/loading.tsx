import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { CardSkeletons, SectionHeaderSkeleton, SkeletonRegion, onDark } from "@/components/skeletons/blocks";
import { cn } from "@/lib/utils";

/** Inicio: hero, colecciones y destacados. */
export default function LoadingHome() {
  return (
    <SkeletonRegion className="flex flex-col">
      <section className="bg-brand-900">
        <Container className="flex min-h-[580px] items-center py-16 max-lg:min-h-[540px] max-lg:items-end max-lg:py-14 max-sm:min-h-[520px] max-sm:py-10">
          <div className="flex w-full max-w-xl flex-col gap-5">
            <Skeleton className={cn("h-8 w-64 rounded-full", onDark)} />
            <div className="flex flex-col gap-3">
              <Skeleton className={cn("h-14 w-[30rem] max-w-full max-sm:h-10", onDark)} />
              <Skeleton className={cn("h-14 w-[26rem] max-w-full max-sm:h-10", onDark)} />
              <Skeleton className={cn("h-14 w-[22rem] max-w-full max-sm:h-10", onDark)} />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton variant="text" className={cn("w-full", onDark)} />
              <Skeleton variant="text" className={cn("w-5/6", onDark)} />
            </div>
            <div className="flex gap-4 pt-2">
              <Skeleton className={cn("h-14 w-44", onDark)} />
              <Skeleton className={cn("h-14 w-28", onDark)} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 max-sm:py-14">
        <Container className="flex flex-col gap-8">
          <SectionHeaderSkeleton />
          <div className="grid grid-cols-5 gap-4 max-lg:hidden">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface p-4">
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton variant="text" className="w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton variant="circle" className="h-14 w-14 shrink-0" />
              </div>
            ))}
          </div>
          <div className="hidden gap-3 overflow-hidden max-lg:flex">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex w-[88px] shrink-0 flex-col items-center gap-2 rounded-lg border border-border bg-surface p-3">
                <Skeleton variant="circle" className="h-14 w-14" />
                <Skeleton className="h-3 w-14" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 max-sm:py-14">
        <Container className="flex flex-col gap-8">
          <SectionHeaderSkeleton />
          <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-3">
            <CardSkeletons count={5} hide={{ 2: "max-md:hidden", 3: "max-lg:hidden" }} />
          </div>
        </Container>
      </section>
    </SkeletonRegion>
  );
}
