import type { Theme } from '@letterkit/registry';
import { cn } from '@/lib/utils';

interface ThemeAvatarProps {
  theme: Theme;
  className?: string;
}

export function ThemeAvatar({ theme, className }: ThemeAvatarProps) {
  const background = theme.tokens.colors.background;
  const foreground = theme.tokens.colors.foreground;

  return (
    <span
      className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold',
        className,
      )}
      style={{ backgroundColor: background, color: foreground }}
      aria-hidden
    >
      {theme.name.charAt(0).toUpperCase()}
    </span>
  );
}
