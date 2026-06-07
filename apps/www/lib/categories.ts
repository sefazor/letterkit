const CATEGORY_ORDER = [
  'account-lifecycle',
  'auth-security',
  'auth',
  'billing',
  'onboarding',
  'notifications',
  'team',
  'integrations',
  'usage-api',
  'commerce',
  'product-platform',
  'support-feedback',
  'transactional',
  'notification',
  'lifecycle',
  'product-update',
] as const;

function titleCaseWords(value: string): string {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Human-readable label from slug (account-lifecycle → Account lifecycle). */
export function formatCategoryLabel(category: string): string {
  return titleCaseWords(category);
}

/** Human-readable template name (account-deletion-cancelled → Account deletion cancelled). */
export function formatTemplateLabel(slug: string): string {
  return titleCaseWords(slug);
}

export function categorySortIndex(category: string): number {
  const index = CATEGORY_ORDER.indexOf(category as (typeof CATEGORY_ORDER)[number]);
  return index === -1 ? CATEGORY_ORDER.length : index;
}
