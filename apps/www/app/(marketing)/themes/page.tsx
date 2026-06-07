import { ThemeCard } from '@/components/marketing/theme-card';
import { ThemesHeader } from '@/components/marketing/themes-header';
import { getAllThemes } from '@/lib/themes';

export default function ThemesPage() {
  const themes = getAllThemes();
  const totalTemplates = themes.reduce((sum, theme) => sum + theme.blocks.length, 0);
  const featuredId = themes[0]?.id ?? 'sensei';

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24">
      <ThemesHeader
        themeCount={themes.length}
        templateCount={totalTemplates}
        featuredThemeId={featuredId}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {themes.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
    </div>
  );
}
