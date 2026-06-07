'use client';

import { LetterkitLogo } from '@/components/letterkit-logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/docs', label: 'Docs' },
  { href: '/themes', label: 'Themes' },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-6">
      <div
        className="pointer-events-auto flex h-14 w-full max-w-5xl items-center rounded-full pl-3 pr-3 transition-colors duration-200"
        style={{
          backgroundColor: 'var(--header-surface)',
          color: 'var(--header-foreground)',
        }}
      >
        <Link
          href="/"
          className="flex items-center rounded-full py-2 pl-2 pr-4 transition-colors hover:bg-[var(--header-hover)]"
        >
          <LetterkitLogo height={18} />
        </Link>

        <nav className="ml-4 flex items-center gap-1">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-[15px] transition-colors',
                  active ? 'font-medium' : 'hover:opacity-100',
                )}
                style={{
                  color: active ? 'var(--header-foreground)' : 'var(--header-muted)',
                  backgroundColor: active ? 'var(--header-active)' : undefined,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeModeToggle
            className="h-10 w-10 hover:bg-[var(--header-hover)]"
            iconClassName="text-[var(--header-muted)]"
          />
          <a
            href="https://github.com/letterkit/letterkit"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-90"
            style={{
              backgroundColor: 'var(--header-cta-bg)',
              color: 'var(--header-cta-fg)',
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
