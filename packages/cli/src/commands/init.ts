import { existsSync } from 'node:fs';
import { join } from 'node:path';
import pc from 'picocolors';
import prompts from 'prompts';
import { getDefaultConfig, getRegistryUrl, writeConfig, type LetterkitConfig } from '../config.js';
import { loadRegistry } from '../registry-client.js';

/**
 * Initialize a new letterkit.json configuration in the current project.
 */
export async function initCommand(cwd: string = process.cwd()): Promise<void> {
  const configPath = join(cwd, 'letterkit.json');

  if (existsSync(configPath)) {
    console.log(pc.yellow('letterkit.json already exists. Skipping init.'));
    return;
  }

  const defaults = getDefaultConfig();
  let themeChoices: Array<{ title: string; value: string }> = [{ title: 'grundy', value: 'grundy' }];

  try {
    const themes = await loadRegistry(getRegistryUrl());
    themeChoices = themes.map((t) => ({ title: `${t.name} (${t.id})`, value: t.id }));
  } catch {
    // fall back to default
  }

  const answers = await prompts([
    {
      type: 'select',
      name: 'style',
      message: 'Component file extension',
      choices: [
        { title: 'TypeScript (.tsx)', value: 'tsx' },
        { title: 'JavaScript (.jsx)', value: 'jsx' },
      ],
      initial: 0,
    },
    {
      type: 'select',
      name: 'defaultTheme',
      message: 'Default theme',
      choices: themeChoices,
      initial: 0,
    },
    {
      type: 'text',
      name: 'components',
      message: 'Email components directory',
      initial: defaults.components,
    },
  ]);

  const config: LetterkitConfig = {
    style: answers.style ?? defaults.style,
    defaultTheme: answers.defaultTheme ?? defaults.defaultTheme,
    components: answers.components ?? defaults.components,
    tailwind: defaults.tailwind,
  };

  writeConfig(config, cwd);
  console.log(pc.green('✓ Created letterkit.json'));
  console.log(pc.dim('Run `letterkit add <category>/<name>` to add a template.'));
}
