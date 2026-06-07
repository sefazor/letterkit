import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/hero';
import { ThemeCard } from '@/components/marketing/theme-card';
import { createSiteMetadata } from '@/lib/site';
import { getAllThemes } from '@/lib/themes';
import Link from 'next/link';

export const metadata: Metadata = createSiteMetadata({
  path: '/',
});

export default function HomePage() {
  const themes = getAllThemes();

  return (
    <div className="mx-auto max-w-5xl px-6 pb-20">
      <Hero featuredThemeId={themes[0]?.id ?? 'sensei'} />

      <section className="mb-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Themes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse collections and open the studio
            </p>
          </div>
          <Link href="/themes" className="text-sm text-muted-foreground hover:text-foreground">
            View all
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-base font-semibold">Complete collections</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Every category your product needs — not one-off templates scattered across folders.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-base font-semibold">Shared design system</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Brand config, tokens, and lifecycle components keep every email visually consistent.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-base font-semibold">Copy, own, edit</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Templates live in your codebase. No runtime dependency on letterkit.
          </p>
        </div>
      </section>
    </div>
  );
}
