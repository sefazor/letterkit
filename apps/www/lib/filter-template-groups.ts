import type { Block } from '@letterkit/registry';
import { formatCategoryLabel, formatTemplateLabel } from './categories';
import type { BlockCategoryGroup } from './group-blocks';

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[-_/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getSearchTokens(query: string): string[] {
  const normalized = normalizeSearchText(query);
  if (!normalized) return [];
  return normalized.split(' ').filter(Boolean);
}

function blockSearchHaystack(block: Block, categoryLabel: string): string {
  return normalizeSearchText(
    [
      block.name,
      block.category,
      categoryLabel,
      formatTemplateLabel(block.name),
      formatCategoryLabel(block.category),
    ].join(' '),
  );
}

export function blockMatchesSearch(block: Block, categoryLabel: string, tokens: string[]): boolean {
  if (tokens.length === 0) return true;

  const haystack = blockSearchHaystack(block, categoryLabel);
  return tokens.every((token) => haystack.includes(token));
}

export function filterTemplateGroups(
  groups: BlockCategoryGroup[],
  query: string,
): BlockCategoryGroup[] {
  const tokens = getSearchTokens(query);
  if (tokens.length === 0) return groups;

  return groups
    .map((group) => ({
      ...group,
      blocks: group.blocks.filter((block) => blockMatchesSearch(block, group.label, tokens)),
    }))
    .filter((group) => group.blocks.length > 0);
}
