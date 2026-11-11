import { Skeleton } from "@/components/ui/Skeleton";
import { AccountShellSkeleton, SkeletonRegion } from "@/components/skeletons/blocks";

export default function LoadingAccount() {
  return (
    <SkeletonRegion>
      <AccountShellSkeleton>
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-9 w-56" />
              <Skeleton variant="text" className="w-64 max-w-full" />
            </div>
            <Skeleton variant="button" className="w-72 max-lg:hidden" />
          </div>

          <div className="grid grid-cols-4 gap-4 max-lg:gap-3 max-md:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5 max-lg:gap-3 max-lg:p-4 max-md:p-3">
                <Skeleton className="h-12 w-12 shrink-0 rounded-lg max-lg:h-10 max-lg:w-10" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-7 w-10" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-6 overflow-hidden border-b border-border pb-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="text" className="w-24 shrink-0" />
            ))}
          </div>

          {[0, 1, 2].map((i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
              <div className="flex items-center justify-between gap-4 bg-surface-subtle px-5 py-4">
                <div className="flex gap-8 max-md:gap-4">
                  {[0, 1, 2].map((j) => (
                    <div key={j} className="flex flex-col gap-2">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton variant="text" className="w-24" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-7 w-24 shrink-0 rounded-full" />
              </div>
              <div className="flex items-center gap-5 p-5 max-md:flex-col max-md:items-stretch max-md:gap-4 max-md:p-4">
                <div className="flex min-w-0 flex-1 items-center gap-4 max-md:gap-3">
                  <div className="flex shrink-0 gap-2">
                    {[0, 1].map((j) => (
                      <Skeleton key={j} className="h-14 w-14 max-md:h-12 max-md:w-12" />
                    ))}
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton variant="text" className="w-48 max-w-full" />
                    <Skeleton className="h-3 w-64 max-w-full" />
                  </div>
                </div>
                <div className="flex shrink-0 gap-3 max-md:grid max-md:grid-cols-2">
                  <Skeleton variant="button" className="w-28 max-md:w-full" />
                  <Skeleton variant="button" className="w-36 max-md:w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </AccountShellSkeleton>
    </SkeletonRegion>
  );
}
