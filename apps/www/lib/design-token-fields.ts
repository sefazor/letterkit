/** Editable design tokens shown in the Try panel (lifecycle palette). */
export const DESIGN_TOKEN_FIELDS = [
  'page',
  'card',
  'border',
  'ink',
  'body',
  'muted',
  'mutedSoft',
  'accent',
  'accentForeground',
  'successDot',
  'successBg',
  'successText',
  'warningDot',
  'warningBg',
  'warningText',
  'dangerDot',
  'dangerBg',
  'dangerText',
  'neutralBadgeBg',
] as const;

export type DesignTokenField = (typeof DESIGN_TOKEN_FIELDS)[number];

/** Tokens kept in theme config but not editable in Try. */
const NON_EDITABLE_TOKEN_FIELDS = ['fontFamily'] as const;

export function isColorTokenKey(key: string, value: unknown): boolean {
  return typeof value === 'string' && /^#[0-9A-Fa-f]{6}$/i.test(value);
}

function isEditableTokenKey(key: string): boolean {
  return !NON_EDITABLE_TOKEN_FIELDS.includes(key as (typeof NON_EDITABLE_TOKEN_FIELDS)[number]);
}

/** Pick token values for the Try panel in a stable order. */
export function getDesignTokenValues(
  tokenValues: Record<string, unknown>,
): Record<string, unknown> {
  const known = DESIGN_TOKEN_FIELDS.filter((key) => key in tokenValues);
  const extra = Object.keys(tokenValues).filter(
    (key) =>
      isEditableTokenKey(key) &&
      !DESIGN_TOKEN_FIELDS.includes(key as DesignTokenField),
  );

  return Object.fromEntries(
    [...known, ...extra.sort()].map((key) => [key, tokenValues[key]]),
  );
}
