import type { Block } from '@letterkit/registry';
import { categorySortIndex, formatCategoryLabel } from './categories';

export interface BlockCategoryGroup {
  category: string;
  label: string;
  blocks: Block[];
}

export function groupBlocksByCategory(blocks: Block[]): BlockCategoryGroup[] {
  const map = new Map<string, Block[]>();

  for (const block of blocks) {
    const list = map.get(block.category) ?? [];
    list.push(block);
    map.set(block.category, list);
  }

  return [...map.entries()]
    .map(([category, categoryBlocks]) => ({
      category,
      label: formatCategoryLabel(category),
      blocks: [...categoryBlocks].sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => {
      const order = categorySortIndex(a.category) - categorySortIndex(b.category);
      return order !== 0 ? order : a.category.localeCompare(b.category);
    });
}
