import { Skeleton } from '@/components/ui/skeleton';
import { ThemeCardSkeleton } from './theme-card-skeleton';

export function MarketingThemesSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24" aria-busy="true" aria-label="Loading themes">
      <section className="mb-14">
        <Skeleton className="mb-4 h-4 w-40" />
        <Skeleton className="h-12 w-48" />
        <div className="mt-5 space-y-2">
          <Skeleton className="h-5 w-full max-w-xl" />
          <Skeleton className="h-5 w-full max-w-lg" />
        </div>
      </section>

      <div className="mb-14">
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <ThemeCardSkeleton />
        <ThemeCardSkeleton />
        <ThemeCardSkeleton />
      </div>
    </div>
  );
}
