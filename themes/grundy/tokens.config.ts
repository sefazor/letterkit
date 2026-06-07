import type { ThemeTokens } from '@letterkit/theme';

/**
 * Design tokens — configure once, every Grundy email inherits this palette.
 * Maps to ThemeTokens for rendering; flat keys match the Try panel lifecycle fields.
 */
export interface GrundyPaletteTokens {
  page: string;
  card: string;
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

export type PartialGrundyTokens = Partial<GrundyPaletteTokens>;

export const grundyTokens: GrundyPaletteTokens = {
  page: '#FAF8F3',
  card: '#FAF8F3',
  ink: '#1A1A1A',
  body: '#1A1A1A',
  muted: '#6B6560',
  mutedSoft: '#6B6560',
  border: '#D9D4C8',
  accent: '#C44536',
  accentForeground: '#FAF8F3',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  successDot: '#2D6A4F',
  successBg: '#E8F0EB',
  successText: '#1B4332',
  warningDot: '#B45309',
  warningBg: '#FEF3C7',
  warningText: '#92400E',
  dangerDot: '#C44536',
  dangerBg: '#FCEAE8',
  dangerText: '#9B2C2C',
  neutralBadgeBg: '#F0EDE6',
};

const GRUNDY_THEME_STRUCTURE = {
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
    radius: {
      sm: '0px',
      md: '0px',
      lg: '0px',
      full: '0px',
    },
  fontFamily: {
    heading: '"Fraunces", Georgia, "Times New Roman", serif',
    body: grundyTokens.fontFamily,
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  fontSize: {
    xs: '11px',
    sm: '13px',
    base: '15px',
    lg: '17px',
    xl: '20px',
    '2xl': '26px',
  },
} as const satisfies Pick<ThemeTokens, 'spacing' | 'radius' | 'fontFamily' | 'fontSize'>;

export function grundyPaletteToThemeTokens(palette: GrundyPaletteTokens): ThemeTokens {
  return {
    colors: {
      background: palette.card,
      foreground: palette.ink,
      muted: '#F0EDE6',
      mutedForeground: palette.muted,
      primary: palette.accent,
      primaryForeground: palette.accentForeground,
      accent: '#E8E4DB',
      accentForeground: palette.ink,
      border: palette.border,
    },
    ...GRUNDY_THEME_STRUCTURE,
    fontFamily: {
      ...GRUNDY_THEME_STRUCTURE.fontFamily,
      body: palette.fontFamily,
    },
  };
}

export function mergeGrundyTokens(
  base: GrundyPaletteTokens,
  override?: PartialGrundyTokens,
): GrundyPaletteTokens {
  return { ...base, ...override };
}
