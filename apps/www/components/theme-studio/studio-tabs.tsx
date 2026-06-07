'use client';

import { cn } from '@/lib/utils';
import type { StudioView } from './studio-context';

interface StudioTabsProps {
  tabs: { id: StudioView; label: string }[];
  view: StudioView;
  onChange: (view: StudioView) => void;
}

export function StudioTabs({ tabs, view, onChange }: StudioTabsProps) {
  return (
    <div className="inline-flex h-9 items-center gap-0.5 rounded-md border border-border p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            'rounded-md px-3 py-1 text-sm font-medium transition-colors',
            view === tab.id
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
