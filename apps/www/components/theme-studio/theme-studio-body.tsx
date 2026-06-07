'use client';

import { TryPanel } from './try-panel';
import { useStudio } from './studio-context';

export function ThemeStudioBody({ children }: { children: React.ReactNode }) {
  const { view } = useStudio();

  return (
    <div className="flex min-h-0 min-w-0 flex-1">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
      <TryPanel open={view === 'try'} />
    </div>
  );
}
