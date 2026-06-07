import { z } from 'zod';

export const TemplateCategory = z.enum([
  'auth',
  'billing',
  'onboarding',
  'transactional',
  'notification',
  'team',
  'lifecycle',
  'product-update',
]);

export const BlockFileSchema = z.object({
  path: z.string().min(1),
  content: z.string(),
});

export const BlockSchema = z.object({
  name: z.string().min(1),
  category: TemplateCategory,
  description: z.string().min(1),
  dependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(BlockFileSchema).min(1),
  previewProps: z.record(z.unknown()).default({}),
});

export type Block = z.infer<typeof BlockSchema>;

export const ThemeSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  author: z.string(),
  tier: z.enum(['free', 'pro']),
  sharedComponents: z.array(BlockFileSchema).default([]),
  blocks: z.array(BlockSchema),
});

export type Theme = z.infer<typeof ThemeSchema>;

export const RegistrySchema = z.object({
  version: z.string(),
  generatedAt: z.string(),
  themes: z.array(ThemeSchema),
});
