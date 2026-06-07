import { Skeleton } from '@/components/ui/skeleton';

function PropsSectionSkeleton({ lines }: { lines: number }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-7 w-14" />
      </div>
      <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-4">
        <Skeleton className="h-3 w-[88%]" />
        <Skeleton className="h-3 w-[72%]" />
        <Skeleton className="h-3 w-[95%]" />
        <Skeleton className="h-3 w-[64%]" />
        <Skeleton className="h-3 w-[81%]" />
        {lines > 5 ? (
          <>
            <Skeleton className="h-3 w-[70%]" />
            <Skeleton className="h-3 w-[92%]" />
            <Skeleton className="h-3 w-[58%]" />
          </>
        ) : null}
        {lines > 8 ? (
          <>
            <Skeleton className="h-3 w-[86%]" />
            <Skeleton className="h-3 w-[67%]" />
          </>
        ) : null}
      </div>
    </section>
  );
}

export function PropsPanelSkeleton() {
  return (
    <div className="min-h-0 flex-1 overflow-auto p-4" aria-busy="true" aria-label="Loading props">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <PropsSectionSkeleton lines={8} />
        <PropsSectionSkeleton lines={6} />
        <PropsSectionSkeleton lines={10} />
      </div>
    </div>
  );
}
