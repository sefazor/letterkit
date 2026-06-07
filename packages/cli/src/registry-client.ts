import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RegistrySchema, type Block, type Theme } from './schema.js';

export { RegistrySchema, type Block, type Theme } from './schema.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

/**
 * Registry shipped inside @letterkit/registry (npm install / npx).
 */
export function resolveBundledRegistryPath(): string | null {
  try {
    return require.resolve('@letterkit/registry/registry.json');
  } catch {
    return null;
  }
}

/**
 * Resolve registry.json for monorepo development.
 */
export function resolveLocalRegistryPath(): string | null {
  if (process.env.LETTERKIT_REGISTRY_LOCAL) {
    return process.env.LETTERKIT_REGISTRY_LOCAL;
  }

  const candidates = [
    join(__dirname, '..', '..', 'registry', 'registry.json'),
    join(process.cwd(), 'packages', 'registry', 'registry.json'),
    join(process.cwd(), 'registry.json'),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

/**
 * Load the registry: local dev → bundled npm package → remote URL.
 */
export async function loadRegistry(registryUrl: string): Promise<Theme[]> {
  const localPath = resolveLocalRegistryPath();
  if (localPath) {
    return loadLocalRegistry(localPath);
  }

  const bundledPath = resolveBundledRegistryPath();
  if (bundledPath) {
    return loadLocalRegistry(bundledPath);
  }

  return fetchRegistry(registryUrl);
}

/**
 * Fetch the registry manifest from a remote URL.
 */
export async function fetchRegistry(registryUrl: string): Promise<Theme[]> {
  const url = registryUrl.endsWith('/registry.json')
    ? registryUrl
    : `${registryUrl.replace(/\/$/, '')}/registry.json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch registry: ${response.status} ${response.statusText}`);
  }

  const data: unknown = await response.json();
  const registry = RegistrySchema.parse(data);
  return registry.themes;
}

/**
 * Load registry from a local file path.
 */
export async function loadLocalRegistry(filePath: string): Promise<Theme[]> {
  const raw = readFileSync(filePath, 'utf-8');
  const parsed: unknown = JSON.parse(raw);
  const registry = RegistrySchema.parse(parsed);
  return registry.themes;
}
