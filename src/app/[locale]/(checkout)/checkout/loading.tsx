import { Skeleton } from "@/components/ui/Skeleton";
import { OrderSummarySkeleton, SkeletonRegion } from "@/components/skeletons/blocks";

const rowCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2 max-md:grid-cols-1",
  3: "grid-cols-3 max-md:grid-cols-2",
};

function FormSectionSkeleton({ rows }: { rows: (1 | 2 | 3)[] }) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 max-sm:p-5">
      <Skeleton variant="title" className="w-40" />
      {rows.map((cols, i) => (
        <div key={i} className={`grid gap-4 ${rowCols[cols]}`}>
          {Array.from({ length: cols }, (_, j) => (
            <div key={j} className="flex flex-col gap-2">
              <Skeleton variant="text" className="w-24" />
              <Skeleton className="h-12" width="w-full" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function LoadingCheckout() {
  return (
    <SkeletonRegion className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-surface">
        <div className="container-page flex items-center justify-between py-3.5">
          <Skeleton className="h-9 w-32" />
          <div className="flex items-center gap-3 max-lg:hidden">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton variant="circle" className="h-8 w-8" />
                <Skeleton className="h-3 w-16" />
                {i < 3 && <Skeleton className="h-0.5 w-10" />}
              </div>
            ))}
          </div>
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>
      </header>
      <div className="hidden border-b border-border bg-surface py-4 max-lg:block">
        <div className="container-page flex flex-col gap-3">
          <Skeleton variant="text" className="w-40" />
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-1.5 flex-1 rounded-full" />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden items-center justify-between gap-3 border-b border-border bg-brand-100 px-4 py-4 max-lg:flex">
        <Skeleton variant="text" className="w-52" />
        <Skeleton variant="text" className="w-20" />
      </div>

      <div className="container-page grid flex-1 grid-cols-[1.5fr_1fr] gap-10 py-8 max-lg:grid-cols-1">
        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 max-sm:p-5">
            <Skeleton variant="title" className="w-32" />
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-12 last:max-md:hidden" />
              ))}
            </div>
          </div>
          <FormSectionSkeleton rows={[1]} />
          <FormSectionSkeleton rows={[2, 1, 1, 3]} />
        </div>
        <aside className="max-lg:hidden">
          <OrderSummarySkeleton items={1} />
        </aside>
      </div>
    </SkeletonRegion>
  );
}
