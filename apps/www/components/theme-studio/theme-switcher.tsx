'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Theme } from '@letterkit/registry';
import { cn } from '@/lib/utils';
import { ThemeAvatar } from './theme-avatar';
import { useStudio } from './studio-context';

interface ThemeSwitcherProps {
  theme: Theme;
  themes: Theme[];
}

function getThemeHref(targetTheme: Theme, template: { category: string; name: string } | null) {
  if (template) {
    const exists = targetTheme.blocks.some(
      (block) => block.category === template.category && block.name === template.name,
    );
    if (exists) {
      return `/themes/${targetTheme.id}/${template.category}/${template.name}`;
    }
  }

  return `/themes/${targetTheme.id}`;
}

export function ThemeSwitcher({ theme, themes }: ThemeSwitcherProps) {
  const { template } = useStudio();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'flex items-center gap-1 rounded-md px-1.5 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
          open && 'bg-muted text-foreground',
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="truncate">{theme.name}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 shrink-0 transition-transform', open && 'rotate-180')} />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label="Switch theme"
          className="absolute left-0 top-[calc(100%+6px)] z-50 min-w-[220px] rounded-md border border-border bg-background p-1"
        >
          {themes.map((item) => {
            const active = item.id === theme.id;
            const href = getThemeHref(item, template);

            return (
              <Link
                key={item.id}
                href={href}
                role="option"
                aria-selected={active}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors',
                  active
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-foreground hover:bg-muted/60',
                )}
              >
                <ThemeAvatar theme={item} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
