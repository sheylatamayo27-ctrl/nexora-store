import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { BreadcrumbSkeleton, SkeletonRegion } from "@/components/skeletons/blocks";

/** Artículo: cabecera (categoría, título, extracto y autor), imagen y párrafos. */
export default function LoadingBlogPost() {
  return (
    <SkeletonRegion className="flex flex-col">
      <div className="bg-surface">
        <Container className="flex flex-col gap-5 py-8">
          <BreadcrumbSkeleton />
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
            <Skeleton className="h-7 w-28 rounded-full" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-12 w-full max-sm:h-9" />
              <Skeleton className="h-12 w-3/4 max-sm:h-9" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton variant="text" className="w-full" />
              <Skeleton variant="text" className="w-2/3" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton variant="circle" className="h-9 w-9 shrink-0" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="ml-3 h-3 w-36" />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <Skeleton className="mx-auto aspect-[16/9] max-w-4xl rounded-2xl" />
      </Container>

      <Container className="pb-12">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {[0, 1, 2].map((p) => (
            <div key={p} className="flex flex-col gap-3">
              <Skeleton variant="text" className="w-full" />
              <Skeleton variant="text" className="w-full" />
              <Skeleton variant="text" className="w-11/12" />
              <Skeleton variant="text" className="w-3/5" />
            </div>
          ))}
        </div>
      </Container>
    </SkeletonRegion>
  );
}
