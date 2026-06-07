import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createSiteMetadata } from '@/lib/site';
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

export async function generateMetadata({ params }: ThemeStudioLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const theme = getThemeById(id);

  if (!theme) {
    return createSiteMetadata({ title: 'Theme not found', noIndex: true });
  }

  return createSiteMetadata({
    title: `${theme.name} theme`,
    description: theme.description,
    path: `/themes/${theme.id}`,
    keywords: [theme.name.toLowerCase(), theme.id, 'react email theme', 'email templates'],
  });
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
