import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageHeaderSkeleton, SkeletonRegion } from "@/components/skeletons/blocks";

/** Una tarjeta de artículo (`BlogCard`): imagen 16:10, meta, título, extracto y autor. */
function PostCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-3 w-32" />
        <Skeleton variant="title" className="w-full" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-3/4" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}

/** Blog: cabecera, artículo destacado y cuadrícula de artículos. */
export default function LoadingBlog() {
  return (
    <SkeletonRegion className="flex flex-col">
      <PageHeaderSkeleton />
      <Container className="flex flex-col gap-10 py-10">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-surface max-lg:grid-cols-1">
          <Skeleton className="min-h-[330px] rounded-none max-lg:aspect-[16/10] max-lg:min-h-0" />
          <div className="flex flex-col justify-center gap-4 p-10 max-sm:p-6">
            <Skeleton className="h-7 w-44 rounded-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-2/3" />
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-5/6" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {Array.from({ length: 6 }, (_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </SkeletonRegion>
  );
}
