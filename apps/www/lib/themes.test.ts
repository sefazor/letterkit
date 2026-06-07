import { describe, expect, it } from 'vitest';
import { getAllThemes, getThemeBlocks } from './themes';

describe('themes lib', () => {
  it('loads themes from registry', () => {
    const themes = getAllThemes();
    expect(themes.length).toBeGreaterThan(0);
    expect(getThemeBlocks('grundy')).toHaveLength(52);
  });
});
