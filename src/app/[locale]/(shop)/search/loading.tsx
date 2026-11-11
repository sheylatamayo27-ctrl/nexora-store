import { Container } from "@/components/ui/Container";
import { CardSkeletons, PageHeaderSkeleton, SkeletonRegion } from "@/components/skeletons/blocks";

export default function LoadingSearch() {
  return (
    <SkeletonRegion className="flex flex-col">
      <PageHeaderSkeleton />
      <Container className="py-10">
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
          <CardSkeletons count={8} />
        </div>
      </Container>
    </SkeletonRegion>
  );
}
