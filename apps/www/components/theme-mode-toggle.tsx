'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface ThemeModeToggleProps {
  className?: string;
  iconClassName?: string;
}

export function ThemeModeToggle({ className, iconClassName }: ThemeModeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className={cn('inline-block h-10 w-10 shrink-0', className)} aria-hidden />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full transition-colors',
        className,
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun
        className={cn(
          'h-4 w-4 transition-all',
          isDark ? 'scale-0 rotate-90' : 'scale-100 rotate-0',
          iconClassName,
        )}
      />
      <Moon
        className={cn(
          'absolute h-4 w-4 transition-all',
          isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-90',
          iconClassName,
        )}
      />
    </button>
  );
}
