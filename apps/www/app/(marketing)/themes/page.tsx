import type { Metadata } from 'next';
import { ThemeCard } from '@/components/marketing/theme-card';
import { ThemesHeader } from '@/components/marketing/themes-header';
import { createSiteMetadata } from '@/lib/site';
import { getAllThemes } from '@/lib/themes';

export const metadata: Metadata = createSiteMetadata({
  title: 'Themes',
  description:
    'Browse letterkit email themes — Grundy, Beacon, Foundry, and Sensei. Preview templates and copy them into your React Email project.',
  path: '/themes',
  keywords: [
    'email themes',
    'react email themes',
    'transactional email templates',
    'grundy',
    'beacon',
    'foundry',
    'sensei',
  ],
});

export default function ThemesPage() {
  const themes = getAllThemes();
  const featuredId = themes[0]?.id ?? 'sensei';

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24">
      <ThemesHeader featuredThemeId={featuredId} />

      <div className="grid gap-6 sm:grid-cols-2">
        {themes.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
    </div>
  );
}
