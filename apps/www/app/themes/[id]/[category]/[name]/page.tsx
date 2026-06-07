import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createSiteMetadata } from '@/lib/site';
import { TemplateRegistrar } from '@/components/theme-studio/template-registrar';
import { TemplateWorkspace } from '@/components/theme-studio/template-workspace';
import {
  getRequestOrigin,
  getResolvedThemeBrand,
  getResolvedThemeTokens,
  getTemplateSource,
  getThemeBlock,
  getThemeById,
  renderTemplateHtml,
} from '@/lib/themes';

interface TemplatePageProps {
  params: Promise<{ id: string; category: string; name: string }>;
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { id, category, name } = await params;
  const theme = getThemeById(id);
  const block = getThemeBlock(id, category, name);

  if (!theme || !block) {
    return createSiteMetadata({ title: 'Template not found', noIndex: true });
  }

  const label = name.replace(/-/g, ' ');

  return createSiteMetadata({
    title: `${block.name} — ${theme.name}`,
    description: block.description,
    path: `/themes/${id}/${category}/${name}`,
    keywords: [label, category, theme.name.toLowerCase(), 'react email template', 'transactional email'],
  });
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { id, category, name } = await params;
  const theme = getThemeById(id);
  const block = getThemeBlock(id, category, name);

  if (!theme || !block) {
    notFound();
  }

  const requestOrigin = await getRequestOrigin();
  const html = await renderTemplateHtml(id, category, name, undefined, requestOrigin);
  const source = getTemplateSource(id, category, name);

  const themeBrand = getResolvedThemeBrand(id, requestOrigin);

  return (
    <>
      <TemplateRegistrar
        themeId={id}
        category={category}
        name={name}
        previewProps={block.previewProps as Record<string, unknown>}
      />
      <TemplateWorkspace
        name={name}
        block={block}
        themeBrand={themeBrand}
        themeTokens={getResolvedThemeTokens(id)}
        html={html}
        source={source}
      />
    </>
  );
}
