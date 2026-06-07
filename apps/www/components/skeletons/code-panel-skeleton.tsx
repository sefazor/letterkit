import { Skeleton } from '@/components/ui/skeleton';

export function CodePanelSkeleton() {
  return (
    <div className="min-h-0 flex-1 overflow-auto p-4" aria-busy="true" aria-label="Loading code">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <section className="space-y-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-7 w-14" />
          </div>
          <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-4">
            <Skeleton className="h-3 w-[72%]" />
            <Skeleton className="h-3 w-[88%]" />
            <Skeleton className="h-3 w-[64%]" />
            <Skeleton className="h-3 w-[91%]" />
            <Skeleton className="h-3 w-[55%]" />
            <Skeleton className="h-3 w-[78%]" />
            <Skeleton className="h-3 w-[83%]" />
            <Skeleton className="h-3 w-[69%]" />
            <Skeleton className="h-3 w-[94%]" />
            <Skeleton className="h-3 w-[61%]" />
            <Skeleton className="h-3 w-[86%]" />
            <Skeleton className="h-3 w-[75%]" />
            <Skeleton className="h-3 w-[58%]" />
          </div>
        </section>
      </div>
    </div>
  );
}
