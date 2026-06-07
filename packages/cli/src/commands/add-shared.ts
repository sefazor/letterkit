import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import pc from 'picocolors';
import type { Block, Theme } from '../registry-client.js';

/**
 * Convert a registry file path to a local project path.
 */
function toTargetPath(cwd: string, componentsDir: string, registryPath: string): string {
  const relative = registryPath.replace(/^components\/emails\//, '');
  return join(cwd, componentsDir, relative);
}

/**
 * Write block and shared component files to the user's project.
 */
export function writeThemeFiles(
  theme: Theme,
  block: Block,
  componentsDir: string,
  cwd: string,
  writeShared: boolean,
): string[] {
  const written: string[] = [];

  if (writeShared) {
    for (const file of theme.sharedComponents) {
      const targetPath = toTargetPath(cwd, componentsDir, file.path);
      if (!existsSync(targetPath)) {
        mkdirSync(dirname(targetPath), { recursive: true });
        writeFileSync(targetPath, file.content);
        written.push(targetPath);
        console.log(pc.green(`  ✓ ${targetPath}`));
      }
    }
  }

  for (const file of block.files) {
    const targetPath = toTargetPath(cwd, componentsDir, file.path);
    if (existsSync(targetPath)) {
      console.log(pc.yellow(`  Skipped (exists): ${targetPath}`));
      continue;
    }
    mkdirSync(dirname(targetPath), { recursive: true });
    writeFileSync(targetPath, file.content);
    written.push(targetPath);
    console.log(pc.green(`  ✓ ${targetPath}`));
  }

  return written;
}
