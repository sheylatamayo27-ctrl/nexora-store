import { ContentPageSkeleton } from "@/components/skeletons/blocks";
import { Skeleton } from "@/components/ui/Skeleton";

const widths = ["w-3/4", "w-2/3", "w-4/5", "w-1/2", "w-3/5", "w-2/3", "w-3/4", "w-1/2", "w-4/5", "w-3/5"];

export default function LoadingFaq() {
  return (
    <ContentPageSkeleton>
      <div className="flex flex-col gap-4">
        <Skeleton variant="title" className="w-48" />
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          {widths.map((w, i) => (
            <div key={i} className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 last:border-b-0">
              <Skeleton className="h-5" width={w} />
              <Skeleton className="h-5 w-5 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </ContentPageSkeleton>
  );
}
