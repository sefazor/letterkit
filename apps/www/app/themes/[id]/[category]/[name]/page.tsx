import { notFound } from 'next/navigation';
import { TemplateRegistrar } from '@/components/theme-studio/template-registrar';
import { TemplateWorkspace } from '@/components/theme-studio/template-workspace';
import {
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

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { id, category, name } = await params;
  const theme = getThemeById(id);
  const block = getThemeBlock(id, category, name);

  if (!theme || !block) {
    notFound();
  }

  const html = await renderTemplateHtml(id, category, name);
  const source = getTemplateSource(id, category, name);

  const themeBrand = getResolvedThemeBrand(id);

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
