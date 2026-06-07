/**
 * Design tokens — configure once, every Foundry lifecycle email inherits this palette.
 * Edit after `letterkit theme add foundry` to white-label colors and typography.
 */
export interface LifecycleTokens {
  card: string;
  page: string;
  ink: string;
  body: string;
  muted: string;
  mutedSoft: string;
  border: string;
  accent: string;
  accentForeground: string;
  fontFamily: string;
  successDot: string;
  successBg: string;
  successText: string;
  warningDot: string;
  warningBg: string;
  warningText: string;
  dangerDot: string;
  dangerBg: string;
  dangerText: string;
  neutralBadgeBg: string;
}

export type PartialLifecycleTokens = Partial<LifecycleTokens>;

export const foundryTokens: LifecycleTokens = {
  card: '#0A0A0A',
  page: '#FAFAF7',
  ink: '#FAFAF7',
  body: '#A1A5AB',
  muted: '#6B6F75',
  mutedSoft: '#6B6F75',
  border: '#1F2024',
  accent: '#FAFAF7',
  accentForeground: '#0A0A0A',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  successDot: '#6B6F75',
  successBg: '#16181C',
  successText: '#FAFAF7',
  warningDot: '#6B6F75',
  warningBg: '#16181C',
  warningText: '#FAFAF7',
  dangerDot: '#6B6F75',
  dangerBg: '#16181C',
  dangerText: '#FAFAF7',
  neutralBadgeBg: '#16181C',
};

export function mergeLifecycleTokens(
  base: LifecycleTokens,
  override?: PartialLifecycleTokens,
): LifecycleTokens {
  return { ...base, ...override };
}
