'use client';

import { ThemeModeToggle } from '@/components/theme-mode-toggle';

export function ThemeToggle() {
  return (
    <ThemeModeToggle className="h-9 w-9 text-muted-foreground hover:bg-muted hover:text-foreground" />
  );
}
