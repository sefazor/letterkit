import type { MetadataRoute } from 'next';
import { getAllThemes } from '@/lib/themes';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const themes = getAllThemes();
  const lastModified = new Date();

  const themeRoutes: MetadataRoute.Sitemap = themes.flatMap((theme) => [
    {
      url: siteUrl(`/themes/${theme.id}`),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...theme.blocks.map((block) => ({
      url: siteUrl(`/themes/${theme.id}/${block.category}/${block.name}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]);

  return [
    {
      url: siteUrl('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: siteUrl('/themes'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: siteUrl('/docs'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...themeRoutes,
  ];
}
