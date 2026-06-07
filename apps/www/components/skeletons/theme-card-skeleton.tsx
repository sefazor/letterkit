import { Skeleton } from '@/components/ui/skeleton';

export function ThemeCardSkeleton() {
  return (
    <div
      className="flex h-full flex-col rounded-2xl border border-border bg-card p-7"
      aria-hidden="true"
    >
      <div className="mb-6 flex items-center gap-2">
        <Skeleton className="h-7 w-16 rounded-full" />
        <Skeleton className="h-7 w-28 rounded-full" />
      </div>

      <Skeleton className="h-9 w-2/3" />
      <Skeleton className="mt-3 h-6 w-full" />
      <div className="mt-4 flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>

      <Skeleton className="mt-8 h-4 w-28" />
    </div>
  );
}
