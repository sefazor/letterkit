/**
 * Design tokens — configure once, every Sensei lifecycle email inherits this palette.
 * Edit after `letterkit theme add sensei` to white-label colors and typography.
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

export const senseiTokens: LifecycleTokens = {
  card: '#FFFFFF',
  page: '#F6F8FA',
  ink: '#0F172A',
  body: '#475569',
  muted: '#64748B',
  mutedSoft: '#94A3B8',
  border: '#E5E7EB',
  accent: '#4F46E5',
  accentForeground: '#FFFFFF',
  fontFamily: 'Arial, Helvetica, sans-serif',
  successDot: '#10B981',
  successBg: '#ECFDF5',
  successText: '#047857',
  warningDot: '#F59E0B',
  warningBg: '#FFFBEB',
  warningText: '#B45309',
  dangerDot: '#EF4444',
  dangerBg: '#FEF2F2',
  dangerText: '#B91C1C',
  neutralBadgeBg: '#F1F5F9',
};

export function mergeLifecycleTokens(
  base: LifecycleTokens,
  override?: PartialLifecycleTokens,
): LifecycleTokens {
  return { ...base, ...override };
}
