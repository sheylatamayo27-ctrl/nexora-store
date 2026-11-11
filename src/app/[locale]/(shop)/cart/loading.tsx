import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  BreadcrumbSkeleton,
  CardSkeletons,
  OrderSummarySkeleton,
  SectionHeaderSkeleton,
  SkeletonRegion,
} from "@/components/skeletons/blocks";

export default function LoadingCart() {
  return (
    <SkeletonRegion className="flex flex-col">
      <Container className="flex flex-col gap-2 pt-8">
        <BreadcrumbSkeleton className="max-lg:hidden" />
        <Skeleton className="h-12 w-96 max-w-full max-sm:h-8 max-sm:w-64" />
      </Container>

      <Container className="grid grid-cols-[1.7fr_1fr] gap-8 py-8 max-lg:grid-cols-1">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-xl bg-brand-100 p-5">
            <Skeleton variant="text" className="w-80 max-w-full" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
          <div className="rounded-xl border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Skeleton variant="text" className="w-24" />
              <Skeleton className="h-3 w-28" />
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-4 border-b border-border p-6 last:border-0 max-sm:p-4">
                <Skeleton className="h-28 w-28 shrink-0 rounded-lg max-sm:h-20 max-sm:w-20" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton variant="text" className="w-3/4" />
                  <Skeleton className="h-3 w-24" />
                  <div className="flex gap-4 pt-2">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-10 w-20 max-sm:hidden" />
                  </div>
                </div>
                <Skeleton variant="title" className="w-24 shrink-0 max-sm:hidden" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 max-lg:hidden">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
                <Skeleton className="h-5 w-5" />
                <Skeleton variant="text" className="w-36" />
                <Skeleton className="h-3 w-44" />
              </div>
            ))}
          </div>
        </div>
        <div className="self-start max-lg:self-auto">
          <OrderSummarySkeleton coupon cta />
        </div>
      </Container>

      <Container className="flex flex-col gap-8 pb-20">
        <SectionHeaderSkeleton subtitle={false} link={false} />
        <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-3">
          <CardSkeletons count={5} hide={{ 2: "max-md:hidden", 3: "max-lg:hidden" }} />
        </div>
      </Container>
    </SkeletonRegion>
  );
}
