import { senseiTokens } from '../../tokens.config';

/** @deprecated Use senseiTokens from tokens.config.ts or getActiveLifecycleTokens(). */
export const atlasColors = {
  bg: senseiTokens.card,
  page: senseiTokens.page,
  ink: senseiTokens.ink,
  body: senseiTokens.body,
  muted: senseiTokens.muted,
  mutedSoft: senseiTokens.mutedSoft,
  border: senseiTokens.border,
  accent: senseiTokens.accent,
  successDot: senseiTokens.successDot,
  successBg: senseiTokens.successBg,
  successText: senseiTokens.successText,
  warningDot: senseiTokens.warningDot,
  warningBg: senseiTokens.warningBg,
  warningText: senseiTokens.warningText,
  dangerDot: senseiTokens.dangerDot,
  dangerBg: senseiTokens.dangerBg,
  dangerText: senseiTokens.dangerText,
} as const;

export const atlasFont = senseiTokens.fontFamily;

export type AtlasBadgeVariant = 'success' | 'warning' | 'danger' | 'neutral';

export const atlasBadgeStyles = {
  success: {
    bg: senseiTokens.successBg,
    text: senseiTokens.successText,
    dot: senseiTokens.successDot,
  },
  warning: {
    bg: senseiTokens.warningBg,
    text: senseiTokens.warningText,
    dot: senseiTokens.warningDot,
  },
  danger: {
    bg: senseiTokens.dangerBg,
    text: senseiTokens.dangerText,
    dot: senseiTokens.dangerDot,
  },
  neutral: { bg: senseiTokens.neutralBadgeBg, text: senseiTokens.body, dot: senseiTokens.mutedSoft },
} as const;
