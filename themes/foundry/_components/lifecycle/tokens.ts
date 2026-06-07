import { foundryTokens } from '../../tokens.config';

/** @deprecated Use foundryTokens from tokens.config.ts or getActiveLifecycleTokens(). */
export const atlasColors = {
  bg: foundryTokens.card,
  page: foundryTokens.page,
  ink: foundryTokens.ink,
  body: foundryTokens.body,
  muted: foundryTokens.muted,
  mutedSoft: foundryTokens.mutedSoft,
  border: foundryTokens.border,
  accent: foundryTokens.accent,
  successDot: foundryTokens.successDot,
  successBg: foundryTokens.successBg,
  successText: foundryTokens.successText,
  warningDot: foundryTokens.warningDot,
  warningBg: foundryTokens.warningBg,
  warningText: foundryTokens.warningText,
  dangerDot: foundryTokens.dangerDot,
  dangerBg: foundryTokens.dangerBg,
  dangerText: foundryTokens.dangerText,
} as const;

export const atlasFont = foundryTokens.fontFamily;

export type AtlasBadgeVariant = 'success' | 'warning' | 'danger' | 'neutral';

export const atlasBadgeStyles = {
  success: {
    bg: foundryTokens.successBg,
    text: foundryTokens.successText,
    dot: foundryTokens.successDot,
  },
  warning: {
    bg: foundryTokens.warningBg,
    text: foundryTokens.warningText,
    dot: foundryTokens.warningDot,
  },
  danger: {
    bg: foundryTokens.dangerBg,
    text: foundryTokens.dangerText,
    dot: foundryTokens.dangerDot,
  },
  neutral: { bg: foundryTokens.neutralBadgeBg, text: foundryTokens.body, dot: foundryTokens.mutedSoft },
} as const;
