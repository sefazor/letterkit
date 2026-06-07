import { Skeleton } from '@/components/ui/skeleton';

const DEFAULT_PAGE_COLOR = '#F6F8FA';

interface EmailPreviewSkeletonProps {
  pageColor?: string;
}

export function EmailPreviewSkeleton({
  pageColor = DEFAULT_PAGE_COLOR,
}: EmailPreviewSkeletonProps) {
  return (
    <div
      className="relative min-h-0 flex-1 overflow-hidden"
      style={{ backgroundColor: pageColor }}
      aria-busy="true"
      aria-label="Loading preview"
    >
      <div className="flex h-full items-start justify-center p-8 md:p-12">
        <div className="w-full max-w-[600px] overflow-hidden rounded-lg border border-black/5 bg-white">
          <div className="border-b border-black/5 px-8 py-6">
            <Skeleton className="h-5 w-28 rounded-sm bg-black/5" />
          </div>

          <div className="space-y-4 px-8 py-8">
            <Skeleton className="h-7 w-[60%] rounded-sm bg-black/5" />
            <Skeleton className="h-4 w-full rounded-sm bg-black/5" />
            <Skeleton className="h-4 w-full rounded-sm bg-black/5" />
            <Skeleton className="h-4 w-[80%] rounded-sm bg-black/5" />

            <div className="pt-2">
              <Skeleton className="h-10 w-36 rounded-sm bg-black/5" />
            </div>

            <div className="space-y-2 pt-4">
              <Skeleton className="h-3 w-full rounded-sm bg-black/5" />
              <Skeleton className="h-3 w-[92%] rounded-sm bg-black/5" />
            </div>
          </div>

          <div className="border-t border-black/5 px-8 py-5">
            <Skeleton className="h-3 w-40 rounded-sm bg-black/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
