import { existsSync } from 'node:fs';
import { join } from 'node:path';
import ora from 'ora';
import pc from 'picocolors';
import { readConfig, getRegistryUrl } from '../config.js';
import { loadRegistry, type Theme } from '../registry-client.js';
import { installTemplateDependencies } from '../install-deps.js';
import { writeThemeFiles } from './add-shared.js';

interface ResolvedBlock {
  themeId: string;
  category: string;
  name: string;
}

/**
 * Parse add argument into theme/category/name.
 */
export function resolveBlockArg(
  arg: string,
  defaultTheme: string | undefined,
): ResolvedBlock | { error: string } {
  const segments = arg.split('/').filter(Boolean);

  if (segments.length === 3) {
    const [themeId, category, name] = segments;
    if (!themeId || !category || !name) {
      return { error: 'Invalid path. Use <theme>/<category>/<name>.' };
    }
    return { themeId, category, name };
  }

  if (segments.length === 2) {
    if (!defaultTheme) {
      return {
        error: 'No defaultTheme in letterkit.json. Run `letterkit init` or use <theme>/<category>/<name>.',
      };
    }
    const [category, name] = segments;
    if (!category || !name) {
      return { error: 'Invalid path. Use <category>/<name> or <theme>/<category>/<name>.' };
    }
    return { themeId: defaultTheme, category, name };
  }

  return {
    error: 'Invalid argument. Use <category>/<name> or <theme>/<category>/<name>.',
  };
}

/**
 * Add a single block from a theme to the user's project.
 */
export async function addCommand(arg: string, cwd: string = process.cwd()): Promise<void> {
  const config = readConfig(cwd);
  if (!config) {
    console.log(pc.red('No letterkit.json found. Run `letterkit init` first.'));
    process.exit(1);
  }

  const resolved = resolveBlockArg(arg, config.defaultTheme);
  if ('error' in resolved) {
    console.log(pc.red(resolved.error));
    process.exit(1);
  }

  const { themeId, category, name } = resolved;
  const spinner = ora('Fetching registry…').start();

  let themes: Theme[];
  try {
    themes = await loadRegistry(getRegistryUrl());
    spinner.succeed('Registry loaded');
  } catch (error: unknown) {
    spinner.fail('Failed to fetch registry');
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(pc.red(message));
    process.exit(1);
  }

  const theme = themes.find((t) => t.id === themeId);
  if (!theme) {
    console.log(pc.red(`Theme "${themeId}" not found.`));
    console.log(pc.dim(`Available: ${themes.map((t) => t.id).join(', ')}`));
    process.exit(1);
  }

  const block = theme.blocks.find((b) => b.category === category && b.name === name);
  if (!block) {
    console.log(pc.red(`Template "${category}/${name}" not found in theme "${themeId}".`));
    console.log(pc.dim(`Run \`letterkit list --theme ${themeId}\` to see available templates.`));
    process.exit(1);
  }

  const sharedDir = join(cwd, config.components, themeId, '_components');
  const writeShared = !existsSync(sharedDir);

  console.log(pc.bold(`\nAdding ${themeId}/${category}/${name}…`));
  const written = writeThemeFiles(theme, block, config.components, cwd, writeShared);

  if (written.length > 0 && block.dependencies.length > 0) {
    installTemplateDependencies(cwd, block.dependencies);
  }

  if (written.length === 0) {
    console.log(pc.yellow('\nNo new files written.'));
  } else {
    console.log(pc.green(`\n✓ Added ${written.length} file(s)`));
  }
}
