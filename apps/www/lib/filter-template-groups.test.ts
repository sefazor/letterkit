import type { Block } from '@letterkit/registry';
import { describe, expect, it } from 'vitest';
import {
  blockMatchesSearch,
  filterTemplateGroups,
  getSearchTokens,
} from './filter-template-groups';
import type { BlockCategoryGroup } from './group-blocks';

const authBlocks: Block[] = [
  { category: 'auth', name: 'password-reset', previewProps: {}, dependencies: [] },
  { category: 'auth', name: 'password-changed', previewProps: {}, dependencies: [] },
  { category: 'auth', name: 'magic-link', previewProps: {}, dependencies: [] },
];

const groups: BlockCategoryGroup[] = [
  {
    category: 'auth',
    label: 'Auth',
    blocks: authBlocks,
  },
  {
    category: 'billing',
    label: 'Billing',
    blocks: [{ category: 'billing', name: 'invoice-receipt', previewProps: {}, dependencies: [] }],
  },
];

describe('filter-template-groups', () => {
  it('tokenizes search queries', () => {
    expect(getSearchTokens('  password   reset ')).toEqual(['password', 'reset']);
  });

  it('matches template names by partial token', () => {
    const passwordReset = authBlocks[0];
    const magicLink = authBlocks[2];
    expect(passwordReset && blockMatchesSearch(passwordReset, 'Auth', ['password'])).toBe(true);
    expect(magicLink && blockMatchesSearch(magicLink, 'Auth', ['password'])).toBe(false);
  });

  it('matches kebab-case names with spaced queries', () => {
    const passwordReset = authBlocks[0];
    expect(passwordReset && blockMatchesSearch(passwordReset, 'Auth', ['password', 'reset'])).toBe(
      true,
    );
  });

  it('filters groups and removes empty categories', () => {
    const filtered = filterTemplateGroups(groups, 'password');
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.category).toBe('auth');
    expect(filtered[0]?.blocks.map((block) => block.name)).toEqual([
      'password-reset',
      'password-changed',
    ]);
  });
});
