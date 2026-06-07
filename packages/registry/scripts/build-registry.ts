import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import { validateTheme } from '@letterkit/theme';
import { BlockSchema, RegistrySchema, ThemeSchema } from '../src/schema.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '../../..');
const themesDir = join(rootDir, 'themes');

/**
 * Build registry.json from theme source directories.
 */
async function buildRegistry(): Promise<void> {
  const themeDirs = readdirSync(themesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
    .map((d) => join(themesDir, d.name))
    .filter((dir) => existsSync(join(dir, 'theme.config.ts')));

  const themes = [];

  for (const themeDir of themeDirs.sort()) {
    const themeId = themeDir.split('/').pop() ?? '';
    const configPath = join(themeDir, 'theme.config.ts');
    const configModule = await import(`file://${configPath}`);
    const configExport = configModule.default ?? configModule[themeId];
    const config = ThemeSchema.omit({ sharedComponents: true, blocks: true }).parse(configExport);

    const metaFiles = await glob('**/meta.json', {
      cwd: themeDir,
      absolute: true,
      ignore: ['**/_components/**'],
    });

    const implemented = metaFiles.map((metaPath) => {
      const blockDir = dirname(metaPath);
      const name = blockDir.split('/').pop() ?? '';
      const category = dirname(blockDir).split('/').pop() ?? '';
      return { category, name };
    });

    validateTheme(themeId, implemented);

    let defaultProps: Record<string, unknown> | undefined;
    const brandConfigPath = join(themeDir, 'brand.config.ts');
    if (existsSync(brandConfigPath)) {
      const brandModule = await import(`file://${brandConfigPath}`);
      const brand = brandModule[`${themeId}Brand`] as Record<string, unknown> | undefined;
      if (brand) {
        defaultProps = { ...defaultProps, brand };
      }
    }

    const tokensConfigPath = join(themeDir, 'tokens.config.ts');
    if (existsSync(tokensConfigPath)) {
      const tokensModule = await import(`file://${tokensConfigPath}`);
      const tokens = tokensModule[`${themeId}Tokens`] as Record<string, unknown> | undefined;
      if (tokens) {
        defaultProps = { ...defaultProps, tokens };
      }
    }

    const componentFiles = await glob('_components/**/*.{tsx,ts}', { cwd: themeDir, absolute: true });
    const sharedComponents = componentFiles.sort().map((filePath) => {
      const relativePath = relative(themeDir, filePath);
      return {
        path: `components/emails/${themeId}/${relativePath}`,
        content: readFileSync(filePath, 'utf-8'),
      };
    });

    for (const rootFile of ['brand.config.ts', 'tokens.config.ts', 'theme.config.ts']) {
      const rootPath = join(themeDir, rootFile);
      if (existsSync(rootPath)) {
        sharedComponents.push({
          path: `components/emails/${themeId}/${rootFile}`,
          content: readFileSync(rootPath, 'utf-8'),
        });
      }
    }

    const blocks = [];
    for (const metaPath of metaFiles.sort()) {
      const blockDir = dirname(metaPath);
      const metaRaw = readFileSync(metaPath, 'utf-8');
      const meta: unknown = JSON.parse(metaRaw);
      const name = blockDir.split('/').pop() ?? '';
      const category = dirname(blockDir).split('/').pop() ?? '';

      const indexContent = readFileSync(join(blockDir, 'index.tsx'), 'utf-8');
      const previewContent = readFileSync(join(blockDir, 'preview.tsx'), 'utf-8');
      const previewModule = await import(`file://${join(blockDir, 'preview.tsx')}`);
      const previewExport = previewModule.previewProps ?? previewModule.default;
      const previewProps =
        typeof previewExport === 'object' && previewExport !== null
          ? (previewExport as Record<string, unknown>)
          : {};

      const block = BlockSchema.parse({
        ...(typeof meta === 'object' && meta !== null ? meta : {}),
        name,
        category,
        files: [
          {
            path: `components/emails/${themeId}/${category}/${name}/index.tsx`,
            content: indexContent,
          },
          {
            path: `components/emails/${themeId}/${category}/${name}/preview.tsx`,
            content: previewContent,
          },
        ],
        previewProps,
      });
      blocks.push(block);
    }

    themes.push(
      ThemeSchema.parse({
        ...config,
        defaultProps,
        sharedComponents,
        blocks,
      }),
    );
  }

  const registry = RegistrySchema.parse({
    version: '0.1.0',
    generatedAt: new Date().toISOString(),
    themes,
  });

  const outputPath = join(__dirname, '..', 'registry.json');
  writeFileSync(outputPath, `${JSON.stringify(registry, null, 2)}\n`);

  const blockCount = themes.reduce((sum, t) => sum + t.blocks.length, 0);
  console.log(
    `Built registry with ${themes.length} theme(s), ${blockCount} templates → ${relative(rootDir, outputPath)}`,
  );
}

buildRegistry().catch((error: unknown) => {
  console.error('Failed to build registry:', error);
  process.exit(1);
});
