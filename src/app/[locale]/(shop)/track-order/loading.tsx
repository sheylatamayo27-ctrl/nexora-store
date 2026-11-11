import { ContentPageSkeleton } from "@/components/skeletons/blocks";
import { Skeleton } from "@/components/ui/Skeleton";

export default function LoadingTrackOrder() {
  return (
    <ContentPageSkeleton>
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-8 max-sm:p-5">
        <div className="flex flex-col gap-2">
          <Skeleton variant="title" className="w-52" />
          <Skeleton variant="text" className="w-80 max-w-full" />
        </div>
        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
        <Skeleton className="h-14 w-full" />
      </div>
    </ContentPageSkeleton>
  );
}
