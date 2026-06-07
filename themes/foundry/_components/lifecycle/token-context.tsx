import {
  mergeLifecycleTokens,
  foundryTokens,
  type LifecycleTokens,
  type PartialLifecycleTokens,
} from '../../tokens.config';

let activeTokens: LifecycleTokens = foundryTokens;

/** Set palette for the current email render (called by LifecycleLayout). */
export function setActiveLifecycleTokens(tokens: LifecycleTokens): void {
  activeTokens = tokens;
}

export function getActiveLifecycleTokens(): LifecycleTokens {
  return activeTokens;
}

export function resolveLifecycleTokens(override?: PartialLifecycleTokens): LifecycleTokens {
  return mergeLifecycleTokens(foundryTokens, override);
}

export type LifecycleBadgeVariant = 'success' | 'warning' | 'danger' | 'neutral';

export function badgeStylesFor(
  tokens: LifecycleTokens,
  variant: LifecycleBadgeVariant,
): { bg: string; text: string; dot: string } {
  switch (variant) {
    case 'success':
      return { bg: tokens.successBg, text: tokens.successText, dot: tokens.successDot };
    case 'warning':
      return { bg: tokens.warningBg, text: tokens.warningText, dot: tokens.warningDot };
    case 'danger':
      return { bg: tokens.dangerBg, text: tokens.dangerText, dot: tokens.dangerDot };
    default:
      return { bg: tokens.neutralBadgeBg, text: tokens.ink, dot: tokens.mutedSoft };
  }
}
