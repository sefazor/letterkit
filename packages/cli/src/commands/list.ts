import ora from 'ora';
import pc from 'picocolors';
import { getRegistryUrl } from '../config.js';
import { loadRegistry, type Block, type Theme } from '../registry-client.js';

/**
 * Group blocks by category for display.
 */
function groupByCategory(blocks: Block[]): Map<string, Block[]> {
  const groups = new Map<string, Block[]>();
  for (const block of blocks) {
    const existing = groups.get(block.category) ?? [];
    existing.push(block);
    groups.set(block.category, existing);
  }
  return groups;
}

/**
 * List available themes or blocks within a theme.
 */
export async function listCommand(themeId?: string): Promise<void> {
  const spinner = ora('Fetching registry…').start();

  let themes: Theme[];
  try {
    themes = await loadRegistry(getRegistryUrl());
    spinner.succeed(themeId ? `Loaded theme "${themeId}"` : `Found ${themes.length} theme(s)`);
  } catch (error: unknown) {
    spinner.fail('Failed to fetch registry');
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(pc.red(message));
    process.exit(1);
  }

  if (themeId) {
    const theme = themes.find((t) => t.id === themeId);
    if (!theme) {
      console.log(pc.red(`Theme "${themeId}" not found.`));
      console.log(pc.dim(`Available: ${themes.map((t) => t.id).join(', ')}`));
      process.exit(1);
    }

    console.log(pc.bold(`\n${theme.name}`) + pc.dim(` · ${theme.tagline}`));
    const groups = groupByCategory(theme.blocks);
    for (const [category, categoryBlocks] of groups) {
      console.log(pc.bold(`\n${category}`));
      for (const block of categoryBlocks) {
        console.log(`  ${pc.cyan(block.name)}  ${pc.dim(block.description)}`);
      }
    }
    console.log(pc.dim(`\n${theme.blocks.length} templates · letterkit add ${themeId}/<category>/<name>`));
    return;
  }

  for (const theme of themes) {
    console.log(pc.bold(`\n${theme.id}`) + pc.dim(` · ${theme.name} — ${theme.tagline}`));
    console.log(`  ${pc.dim(`${theme.blocks.length} templates · tier: ${theme.tier}`)}`);
  }

  console.log(pc.dim('\nList blocks: letterkit list --theme <theme-id>'));
  console.log(pc.dim('Install theme: letterkit theme add <theme-id>'));
}
