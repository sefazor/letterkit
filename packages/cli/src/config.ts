import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';

/**
 * User project configuration schema.
 */
export const LetterkitConfigSchema = z.object({
  $schema: z.string().optional(),
  style: z.enum(['tsx', 'jsx']).default('tsx'),
  defaultTheme: z.string().default('grundy'),
  components: z.string().default('./components/emails'),
  tailwind: z
    .object({
      config: z.string().default('tailwind.config.ts'),
    })
    .default({}),
});

export type LetterkitConfig = z.infer<typeof LetterkitConfigSchema>;

const CONFIG_FILENAME = 'letterkit.json';

/**
 * Default configuration for a new letterkit project.
 */
export function getDefaultConfig(): LetterkitConfig {
  return LetterkitConfigSchema.parse({});
}

/**
 * Read letterkit.json from the current working directory.
 */
export function readConfig(cwd: string = process.cwd()): LetterkitConfig | null {
  const configPath = join(cwd, CONFIG_FILENAME);
  if (!existsSync(configPath)) {
    return null;
  }
  const raw = readFileSync(configPath, 'utf-8');
  const parsed: unknown = JSON.parse(raw);
  return LetterkitConfigSchema.parse(parsed);
}

/**
 * Write letterkit.json to the current working directory.
 */
export function writeConfig(config: LetterkitConfig, cwd: string = process.cwd()): void {
  const configPath = join(cwd, CONFIG_FILENAME);
  writeFileSync(
    configPath,
    `${JSON.stringify({ $schema: 'https://letterkit.dev/schema.json', ...config }, null, 2)}\n`,
  );
}

/**
 * Resolve the registry URL from environment or default.
 */
export function getRegistryUrl(): string {
  return process.env.LETTERKIT_REGISTRY_URL ?? 'https://letterkit.dev/registry';
}
