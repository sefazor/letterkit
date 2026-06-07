import { notFound } from 'next/navigation';
import { StudioProvider } from '@/components/theme-studio/studio-context';
import { ThemeSidebar } from '@/components/theme-studio/theme-sidebar';
import { ThemeStudioBody } from '@/components/theme-studio/theme-studio-body';
import { ThemeStudioHeader } from '@/components/theme-studio/theme-studio-header';
import { groupBlocksByCategory } from '@/lib/group-blocks';
import {
  getAllThemes,
  getRequestOrigin,
  getResolvedThemeBrand,
  getResolvedThemeTokens,
  getThemeBlocks,
  getThemeById,
} from '@/lib/themes';

interface ThemeStudioLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function ThemeStudioLayout({ children, params }: ThemeStudioLayoutProps) {
  const { id } = await params;
  const theme = getThemeById(id);

  if (!theme) {
    notFound();
  }

  const blocks = getThemeBlocks(id);
  const groups = groupBlocksByCategory(blocks);
  const themes = getAllThemes();
  const requestOrigin = await getRequestOrigin();
  const initialBrand = getResolvedThemeBrand(id, requestOrigin);
  const initialTokens = getResolvedThemeTokens(id);

  return (
    <StudioProvider themeId={id} initialBrand={initialBrand} initialTokens={initialTokens}>
      <div className="flex h-screen flex-col overflow-hidden">
        <ThemeStudioHeader theme={theme} themes={themes} templateCount={blocks.length} />
        <div className="flex min-h-0 flex-1">
          <ThemeSidebar themeId={id} groups={groups} />
          <ThemeStudioBody>{children}</ThemeStudioBody>
        </div>
      </div>
    </StudioProvider>
  );
}
