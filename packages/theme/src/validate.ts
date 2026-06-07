import { getThemeContract, getThemeContractEntries } from './contracts/index.js';
import type { ThemeTemplateEntry } from './types.js';

/**
 * Validate that a theme implements every entry in its contract.
 * Throws with a clear message listing missing templates.
 */
export function validateTheme(themeId: string, implemented: ThemeTemplateEntry[]): void {
  const contract = getThemeContract(themeId);
  const implementedSet = new Set(implemented.map((e) => `${e.category}/${e.name}`));
  const missing: string[] = [];

  for (const { category, name } of getThemeContractEntries(themeId)) {
    const key = `${category}/${name}`;
    if (!implementedSet.has(key)) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Theme "${themeId}" violates template contract — missing ${missing.length} template(s):\n` +
        missing.map((m) => `  - ${m}`).join('\n'),
    );
  }

  const extra = implemented.filter(({ category, name }) => {
    const allowed = contract[category];
    return !allowed || !(allowed as readonly string[]).includes(name);
  });

  if (extra.length > 0) {
    throw new Error(
      `Theme "${themeId}" contains templates outside its contract:\n` +
        extra.map((e) => `  - ${e.category}/${e.name}`).join('\n'),
    );
  }
}
