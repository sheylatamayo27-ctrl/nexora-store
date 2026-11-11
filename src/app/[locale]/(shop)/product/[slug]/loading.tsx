import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { BreadcrumbSkeleton, CardSkeletons, SectionHeaderSkeleton, SkeletonRegion } from "@/components/skeletons/blocks";

export default function LoadingProduct() {
  return (
    <SkeletonRegion className="flex flex-col">
      <div className="bg-surface">
        <Container className="flex flex-col gap-6 py-6 max-lg:gap-4 max-lg:pt-4">
          <BreadcrumbSkeleton />
          <div className="grid grid-cols-2 gap-12 max-lg:grid-cols-1 max-lg:gap-10">
            <div className="flex gap-4 self-start max-lg:flex-col-reverse max-lg:self-auto">
              <div className="flex shrink-0 flex-col gap-3 max-lg:flex-row">
                {[0, 1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-20 rounded-lg max-sm:h-16 max-sm:w-16" />
                ))}
              </div>
              <Skeleton variant="image" className="flex-1 rounded-2xl" />
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <Skeleton className="h-6 w-24 rounded-sm" />
                <Skeleton className="h-6 w-28" />
              </div>
              <div className="flex flex-col gap-3">
                <Skeleton className="h-12 w-full max-sm:h-9" />
                <Skeleton className="h-12 w-2/3 max-sm:h-9" />
              </div>
              <Skeleton variant="text" className="w-56" />
              <Skeleton className="h-10 w-72 max-w-full" />
              <Skeleton className="h-3 w-80 max-w-full" />
              <div className="h-px bg-border" />
              <Skeleton variant="text" className="w-full" />
              <div className="flex flex-col gap-3">
                <Skeleton variant="text" className="w-28" />
                <div className="flex gap-3">
                  {[0, 1, 2].map((i) => (
                    <Skeleton key={i} variant="circle" className="h-10 w-10" />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Skeleton variant="text" className="w-20" />
                <div className="flex gap-3">
                  {[0, 1, 2].map((i) => (
                    <Skeleton key={i} variant="button" className="w-28" />
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-14 w-32 shrink-0" />
                <Skeleton className="h-14 flex-1" />
                <Skeleton className="h-14 flex-1 max-md:hidden" />
                <Skeleton className="h-14 w-14 shrink-0 max-md:hidden" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="flex flex-col gap-6 py-14 max-md:hidden">
        <div className="flex gap-8 border-b border-border pb-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} variant="text" className="w-28" />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-11/12" />
          <Skeleton variant="text" className="w-4/5" />
        </div>
      </Container>

      <Container className="flex flex-col gap-8 pb-20 max-md:pt-10">
        <SectionHeaderSkeleton subtitle={false} />
        <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-3">
          <CardSkeletons count={5} hide={{ 2: "max-md:hidden", 3: "max-lg:hidden" }} />
        </div>
      </Container>
    </SkeletonRegion>
  );
}
