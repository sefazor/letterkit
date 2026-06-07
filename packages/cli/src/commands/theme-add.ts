import { existsSync } from 'node:fs';
import { join } from 'node:path';
import ora from 'ora';
import pc from 'picocolors';
import { readConfig, getRegistryUrl } from '../config.js';
import { loadRegistry, type Theme } from '../registry-client.js';
import { writeThemeFiles } from './add-shared.js';

/**
 * Install all templates from a theme into the user's project.
 */
export async function themeAddCommand(themeId: string, cwd: string = process.cwd()): Promise<void> {
  const config = readConfig(cwd);
  if (!config) {
    console.log(pc.red('No letterkit.json found. Run `letterkit init` first.'));
    process.exit(1);
  }

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

  console.log(pc.bold(`\nInstalling theme "${theme.name}" (${theme.blocks.length} templates)…`));

  const sharedDir = join(cwd, config.components, themeId, '_components');
  let totalWritten = 0;
  let sharedWritten = false;

  for (const block of theme.blocks) {
    const writeShared = !sharedWritten && !existsSync(sharedDir);
    const written = writeThemeFiles(theme, block, config.components, cwd, writeShared);
    if (writeShared && written.length > 0) sharedWritten = true;
    totalWritten += written.length;
  }

  console.log(pc.green(`\n✓ Installed ${theme.blocks.length} templates (${totalWritten} files written)`));
  console.log(pc.dim(`Path: ${config.components}/${themeId}/`));
}
