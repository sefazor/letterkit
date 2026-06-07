import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import React from 'react';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
import { renderTemplateHtml } from '../apps/www/lib/themes.ts';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(rootDir, 'docs/img');

const shots = [
  {
    file: 'grundy-welcome.png',
    themeId: 'grundy',
    category: 'onboarding',
    name: 'welcome',
    width: 720,
    height: 820,
  },
  {
    file: 'grundy-verify-email.png',
    themeId: 'grundy',
    category: 'auth',
    name: 'verify-email',
    width: 720,
    height: 760,
  },
  {
    file: 'grundy-invoice-receipt.png',
    themeId: 'grundy',
    category: 'billing',
    name: 'invoice-receipt',
    width: 720,
    height: 980,
  },
] as const;

async function main(): Promise<void> {
  mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  try {
    for (const shot of shots) {
      const html = await renderTemplateHtml(
        shot.themeId,
        shot.category,
        shot.name,
        undefined,
        'https://letterkit.dev',
      );

      const page = await browser.newPage({
        viewport: { width: shot.width, height: shot.height },
        deviceScaleFactor: 2,
      });

      await page.setContent(html, { waitUntil: 'networkidle' });
      await page.screenshot({
        path: join(outDir, shot.file),
        fullPage: true,
      });
      await page.close();

      console.log(`✓ ${shot.file}`);
    }
  } finally {
    await browser.close();
  }
}

await main();
