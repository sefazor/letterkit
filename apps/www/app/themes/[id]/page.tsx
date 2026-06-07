import { notFound, redirect } from 'next/navigation';
import { groupBlocksByCategory } from '@/lib/group-blocks';
import { getThemeBlocks, getThemeById } from '@/lib/themes';

interface ThemeIndexPageProps {
  params: Promise<{ id: string }>;
}

export default async function ThemeIndexPage({ params }: ThemeIndexPageProps) {
  const { id } = await params;
  const theme = getThemeById(id);

  if (!theme) {
    notFound();
  }

  const groups = groupBlocksByCategory(getThemeBlocks(id));
  const first = groups[0]?.blocks[0];

  if (!first) {
    notFound();
  }

  redirect(`/themes/${id}/${first.category}/${first.name}`);
}
