import { z } from 'zod';

/** @deprecated Use string category ids — themes define their own contract categories. */
export const TemplateCategory = z.enum([
  'auth',
  'auth-security',
  'account-lifecycle',
  'billing',
  'onboarding',
  'transactional',
  'notification',
  'notifications',
  'team',
  'lifecycle',
  'product-update',
  'product-platform',
  'usage-api',
  'integrations',
  'support-feedback',
  'commerce',
]);

export type TemplateCategory = z.infer<typeof TemplateCategory>;

export const ThemeTokensSchema = z.object({
  colors: z.object({
    background: z.string(),
    foreground: z.string(),
    muted: z.string(),
    mutedForeground: z.string(),
    primary: z.string(),
    primaryForeground: z.string(),
    accent: z.string(),
    accentForeground: z.string(),
    border: z.string(),
  }),
  spacing: z.object({
    xs: z.string(),
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
    xl: z.string(),
    '2xl': z.string(),
  }),
  radius: z.object({
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
    full: z.string(),
  }),
  fontFamily: z.object({
    heading: z.string(),
    body: z.string(),
    mono: z.string(),
  }),
  fontSize: z.object({
    xs: z.string(),
    sm: z.string(),
    base: z.string(),
    lg: z.string(),
    xl: z.string(),
    '2xl': z.string(),
  }),
});

export const BlockFileSchema = z.object({
  path: z.string().min(1),
  content: z.string(),
});

export type BlockFile = z.infer<typeof BlockFileSchema>;

export const BlockSchema = z.object({
  name: z.string().min(1),
  category: z.union([TemplateCategory, z.string().min(1)]),
  description: z.string().min(1),
  dependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(BlockFileSchema).min(1),
  previewProps: z.record(z.unknown()).default({}),
});

export type Block = z.infer<typeof BlockSchema>;

export const ThemeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  author: z.string().min(1),
  tier: z.enum(['free', 'pro']),
  tokens: ThemeTokensSchema,
  defaultProps: z.record(z.unknown()).optional(),
  sharedComponents: z.array(BlockFileSchema).default([]),
  blocks: z.array(BlockSchema),
});

export type Theme = z.infer<typeof ThemeSchema>;

export const RegistrySchema = z.object({
  version: z.string(),
  generatedAt: z.string(),
  themes: z.array(ThemeSchema),
});

export type Registry = z.infer<typeof RegistrySchema>;
