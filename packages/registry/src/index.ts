import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RegistrySchema, type Block, type Registry, type Theme } from './schema.js';

export {
  TemplateCategory,
  BlockSchema,
  ThemeSchema,
  RegistrySchema,
  type Block,
  type BlockFile,
  type Theme,
  type Registry,
} from './schema.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Load and parse the registry manifest from disk.
 */
export function loadRegistry(): Registry {
  const registryPath = join(__dirname, '..', 'registry.json');
  const raw = readFileSync(registryPath, 'utf-8');
  const parsed: unknown = JSON.parse(raw);
  return RegistrySchema.parse(parsed);
}

/**
 * Get a theme by id.
 */
export function getTheme(id: string): Theme | undefined {
  const registry = loadRegistry();
  return registry.themes.find((theme) => theme.id === id);
}

/**
 * List all themes in the registry.
 */
export function listThemes(): Theme[] {
  const registry = loadRegistry();
  return registry.themes;
}

/**
 * List all blocks in a theme.
 */
export function listBlocksInTheme(themeId: string): Block[] {
  const theme = getTheme(themeId);
  return theme?.blocks ?? [];
}

/**
 * Get a single block within a theme.
 */
export function getBlock(themeId: string, category: string, name: string): Block | undefined {
  const theme = getTheme(themeId);
  return theme?.blocks.find((block) => block.category === category && block.name === name);
}
