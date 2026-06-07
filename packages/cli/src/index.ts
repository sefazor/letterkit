import { Command, Option } from 'commander';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { diffCommand } from './commands/diff.js';
import { themeAddCommand } from './commands/theme-add.js';

const program = new Command();

program
  .name('letterkit')
  .description('Copy-paste transactional email themes for React Email')
  .version('0.1.0');

program
  .command('init')
  .description('Create letterkit.json in the current project')
  .action(async () => {
    await initCommand();
  });

program
  .command('add')
  .description('Add a template from a theme to your project')
  .argument('<path>', 'Template path: <category>/<name> or <theme>/<category>/<name>')
  .action(async (path: string) => {
    await addCommand(path);
  });

program
  .command('list')
  .description('List available themes (default) or blocks within a theme')
  .addOption(new Option('--theme <id>', 'List blocks within a specific theme'))
  .action(async (options: { theme?: string }) => {
    await listCommand(options.theme);
  });

const themeCmd = program.command('theme').description('Theme management commands');

themeCmd
  .command('add')
  .description('Install all templates from a theme')
  .argument('<theme-id>', 'Theme id to install')
  .action(async (themeId: string) => {
    await themeAddCommand(themeId);
  });

program
  .command('diff')
  .description('Show changes if upstream template was updated (TODO)')
  .argument('<path>', 'Template path')
  .action(async (path: string) => {
    await diffCommand(path);
  });

program.parse();
