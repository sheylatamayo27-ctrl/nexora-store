import { Skeleton } from "@/components/ui/Skeleton";
import { AccountShellSkeleton, CardSkeletons, SkeletonRegion } from "@/components/skeletons/blocks";

/** Favoritos: menú de la cuenta y cuadrícula de productos guardados. */
export default function LoadingWishlist() {
  return (
    <SkeletonRegion>
      <AccountShellSkeleton>
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-9 w-56" />
              <Skeleton variant="text" className="w-80 max-w-full" />
            </div>
            <div className="flex gap-3 max-md:hidden">
              <Skeleton variant="button" className="w-32" />
              <Skeleton variant="button" className="w-44" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
            <CardSkeletons count={4} />
          </div>
        </div>
      </AccountShellSkeleton>
    </SkeletonRegion>
  );
}
