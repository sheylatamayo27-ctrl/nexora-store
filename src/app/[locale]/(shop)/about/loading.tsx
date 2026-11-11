import { ContentPageSkeleton, TextLinesSkeleton } from "@/components/skeletons/blocks";
import { Skeleton } from "@/components/ui/Skeleton";

export default function LoadingAbout() {
  return (
    <ContentPageSkeleton wide>
      <div className="flex flex-col gap-6">
        <div className="flex max-w-3xl flex-col gap-4">
          <Skeleton variant="title" className="w-48" />
          <TextLinesSkeleton count={5} />
          <Skeleton variant="title" className="mt-4 w-32" />
          <TextLinesSkeleton count={2} />
        </div>
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
              <Skeleton className="h-11 w-11 rounded-lg" />
              <Skeleton variant="title" className="w-24" />
              <TextLinesSkeleton count={3} />
            </div>
          ))}
        </div>
      </div>
    </ContentPageSkeleton>
  );
}
