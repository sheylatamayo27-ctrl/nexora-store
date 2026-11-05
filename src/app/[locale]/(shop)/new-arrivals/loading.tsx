import { CardSkeletons, ContentBannerSkeleton, SkeletonRegion } from "@/components/skeletons/blocks";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

/** Novedades: banner + grilla de 8 tarjetas de producto. */
export default function LoadingNewArrivals() {
  return (
    <SkeletonRegion className="flex flex-col">
      <ContentBannerSkeleton />
      <Container className="flex flex-col gap-6 py-14 max-md:py-10">
        <Skeleton variant="text" className="w-28" />
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-3">
          <CardSkeletons count={8} />
        </div>
      </Container>
    </SkeletonRegion>
  );
}
