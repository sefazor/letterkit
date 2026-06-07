import type { ThemeTokens } from '@letterkit/theme';

/**
 * Design tokens — configure once, every Beacon email inherits this palette.
 * Forest signature for fintech / billing. Flat keys match the Try panel fields.
 */
export interface BeaconPaletteTokens {
  page: string;
  card: string;
  surface: string;
  surfaceTint: string;
  ink: string;
  body: string;
  muted: string;
  mutedSoft: string;
  border: string;
  forest: string;
  forestSoft: string;
  forestText: string;
  forestMuted: string;
  fontFamily: string;
  fontMono: string;
  /** Try panel alias → forest */
  accent: string;
  accentForeground: string;
}

export type PartialBeaconTokens = Partial<BeaconPaletteTokens>;

export const beaconTokens: BeaconPaletteTokens = {
  page: '#F5F1E8',
  card: '#FFFFFF',
  surface: '#FAFAF7',
  surfaceTint: '#EFEDE8',
  ink: '#0A0A0A',
  body: '#57534E',
  muted: '#78716C',
  mutedSoft: '#A8A29E',
  border: '#E7E5E4',
  forest: '#0F3D2E',
  forestSoft: '#1A5240',
  forestText: '#F5EFE0',
  forestMuted: '#8FA89C',
  fontFamily: '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  accent: '#0F3D2E',
  accentForeground: '#F5EFE0',
};

const BEACON_THEME_STRUCTURE = {
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  radius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  fontFamily: {
    heading: beaconTokens.fontFamily,
    body: beaconTokens.fontFamily,
    mono: beaconTokens.fontMono,
  },
  fontSize: {
    xs: '11px',
    sm: '12px',
    base: '14px',
    lg: '15px',
    xl: '22px',
    '2xl': '28px',
  },
} as const satisfies Pick<ThemeTokens, 'spacing' | 'radius' | 'fontFamily' | 'fontSize'>;

export function beaconPaletteToThemeTokens(palette: BeaconPaletteTokens): ThemeTokens {
  return {
    colors: {
      background: palette.card,
      foreground: palette.ink,
      muted: palette.surface,
      mutedForeground: palette.muted,
      primary: palette.forest,
      primaryForeground: palette.forestText,
      accent: palette.surfaceTint,
      accentForeground: palette.ink,
      border: palette.border,
    },
    ...BEACON_THEME_STRUCTURE,
    fontFamily: {
      ...BEACON_THEME_STRUCTURE.fontFamily,
      body: palette.fontFamily,
      mono: palette.fontMono,
    },
  };
}

export function mergeBeaconTokens(
  base: BeaconPaletteTokens,
  override?: PartialBeaconTokens,
): BeaconPaletteTokens {
  return { ...base, ...override };
}
