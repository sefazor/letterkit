import Link from 'next/link';
import type { Theme } from '@letterkit/registry';

interface ThemeCardProps {
  theme: Theme;
}

export function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <Link
      href={`/themes/${theme.id}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-foreground/25"
    >
      <div className="mb-6 flex items-center gap-2">
        <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium capitalize text-foreground">
          {theme.tier}
        </span>
        <span className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
          {theme.blocks.length} templates
        </span>
      </div>

      <h2 className="text-3xl font-semibold tracking-tight">{theme.name}</h2>
      <p className="mt-3 text-lg text-foreground/80">{theme.tagline}</p>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted-foreground">
        {theme.description}
      </p>

      <span className="mt-8 text-[15px] font-medium text-foreground transition-colors group-hover:text-foreground/70">
        Open studio →
      </span>
    </Link>
  );
}
