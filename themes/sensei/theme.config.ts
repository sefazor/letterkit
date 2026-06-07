import type { ThemeConfig } from '@letterkit/theme';
import { senseiTokens } from './tokens.config';

export const sensei: ThemeConfig = {
  id: 'sensei',
  name: 'Sensei',
  tagline: '137 SaaS email templates. One design system.',
  description:
    'Complete SaaS email suite — auth, billing, onboarding, notifications, team, integrations, and more. White canvas, blue accents, mock-ready previews.',
  author: 'letterkit',
  tier: 'free',
  tokens: {
    colors: {
      background: senseiTokens.card,
      foreground: senseiTokens.ink,
      muted: senseiTokens.page,
      mutedForeground: senseiTokens.muted,
      primary: senseiTokens.accent,
      primaryForeground: senseiTokens.accentForeground,
      accent: senseiTokens.successBg,
      accentForeground: senseiTokens.successText,
      border: senseiTokens.border,
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
      sm: '4px',
      md: '8px',
      lg: '16px',
      full: '9999px',
    },
    fontFamily: {
      heading: senseiTokens.fontFamily,
      body: senseiTokens.fontFamily,
      mono: 'Courier New, Courier, monospace',
    },
    fontSize: {
      xs: '12px',
      sm: '13px',
      base: '16px',
      lg: '20px',
      xl: '24px',
      '2xl': '36px',
    },
  },
};

/** Premium card emails — black canvas, white shell. */
export const senseiCanvas = '#0C0C0C';

export default sensei;
