import { ContentBannerSkeleton, SkeletonRegion, TextLinesSkeleton } from "@/components/skeletons/blocks";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

const card = "flex flex-col gap-6 rounded-xl border border-border bg-surface p-8 max-sm:p-5";

export default function LoadingContact() {
  return (
    <SkeletonRegion className="flex flex-col">
      <ContentBannerSkeleton />
      <Container className="py-14 max-md:py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-start gap-8 max-lg:grid-cols-1 max-sm:gap-6">
          <div className={card}>
            <Skeleton variant="title" className="w-56" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-11 w-11 shrink-0 rounded-lg" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-48 max-w-full" />
                </div>
              </div>
            ))}
            <TextLinesSkeleton count={3} />
          </div>
          <div className={card}>
            <Skeleton variant="title" className="w-52" />
            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        </div>
      </Container>
    </SkeletonRegion>
  );
}
