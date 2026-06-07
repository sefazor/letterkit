import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import pc from 'picocolors';

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

export function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn';
  if (existsSync(join(cwd, 'bun.lock')) || existsSync(join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
}

export function uniqueDependencies(dependencies: string[]): string[] {
  return [...new Set(dependencies.map((dep) => dep.trim()).filter(Boolean))].sort();
}

function installCommand(pm: PackageManager, packages: string[]): { command: string; args: string[] } {
  switch (pm) {
    case 'pnpm':
      return { command: 'pnpm', args: ['add', ...packages] };
    case 'yarn':
      return { command: 'yarn', args: ['add', ...packages] };
    case 'bun':
      return { command: 'bun', args: ['add', ...packages] };
    default:
      return { command: 'npm', args: ['install', ...packages] };
  }
}

/**
 * Install template peer dependencies into the user's project.
 */
export function installTemplateDependencies(
  cwd: string,
  dependencies: string[],
  options?: { dryRun?: boolean },
): boolean {
  if (process.env.LETTERKIT_SKIP_INSTALL === '1') {
    return true;
  }

  const packages = uniqueDependencies(dependencies);
  if (packages.length === 0) {
    return true;
  }

  const pm = detectPackageManager(cwd);
  const { command, args } = installCommand(pm, packages);
  const printable = `${command} ${args.join(' ')}`;

  if (options?.dryRun) {
    console.log(pc.dim(`Would run: ${printable}`));
    return true;
  }

  console.log(pc.bold('\nInstalling dependencies…'));
  console.log(pc.dim(`  ${printable}`));

  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    env: process.env,
  });

  if (result.status !== 0) {
    console.log(pc.yellow('\nDependency install failed. Run manually:'));
    console.log(pc.cyan(`  ${printable}`));
    return false;
  }

  console.log(pc.green('✓ Dependencies installed'));
  return true;
}
