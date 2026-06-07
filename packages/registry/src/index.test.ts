import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { getBlock, getTheme, listBlocksInTheme, listThemes } from './index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('@letterkit/registry', () => {
  it('registry.json exists after build', () => {
    expect(existsSync(join(__dirname, '..', 'registry.json'))).toBe(true);
  });

  it('lists Grundy theme with 52 templates', () => {
    const themes = listThemes();
    expect(themes).toHaveLength(1);
    expect(themes[0]?.id).toBe('grundy');
    expect(listBlocksInTheme('grundy')).toHaveLength(52);
    expect(getTheme('grundy')?.tier).toBe('free');
    expect(getBlock('grundy', 'auth', 'verify-email')?.category).toBe('auth');
  });
});
