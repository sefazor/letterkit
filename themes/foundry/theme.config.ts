import type { ThemeConfig } from '@letterkit/theme';
import { foundryTokens } from './tokens.config';

export const foundry: ThemeConfig = {
  id: 'foundry',
  name: 'Foundry',
  tagline: 'Editorial weight. Zero ornament.',
  description:
    'Dark-first brutalist editorial. For dev tools, changelogs, and SaaS that means it.',
  author: 'letterkit',
  tier: 'free',
  tokens: {
    colors: {
      background: foundryTokens.card,
      foreground: foundryTokens.ink,
      muted: '#16181C',
      mutedForeground: foundryTokens.muted,
      primary: foundryTokens.accent,
      primaryForeground: foundryTokens.accentForeground,
      accent: '#16181C',
      accentForeground: foundryTokens.ink,
      border: foundryTokens.border,
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
    },
    radius: {
      sm: '2px',
      md: '3px',
      lg: '4px',
      full: '9999px',
    },
    fontFamily: {
      heading: '"Inter Tight", -apple-system, sans-serif',
      body: foundryTokens.fontFamily,
      mono: '"JetBrains Mono", ui-monospace, monospace',
    },
    fontSize: {
      xs: '11px',
      sm: '13px',
      base: '15px',
      lg: '22px',
      xl: '26px',
      '2xl': '56px',
    },
  },
};

/** Light page canvas — dark card sits on top. */
export const foundryCanvas = '#FAFAF7';

export default foundry;
