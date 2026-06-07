/**
 * Design token values for a letterkit theme.
 */
export interface ThemeTokens {
  colors: {
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    primary: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  fontFamily: {
    heading: string;
    body: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
}

/**
 * Full theme configuration exported by each theme's theme.config.ts.
 */
export interface ThemeConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  author: string;
  tier: 'free' | 'pro';
  tokens: ThemeTokens;
  defaultProps?: Record<string, unknown>;
}

/**
 * A single template entry discovered in a theme directory.
 */
export interface ThemeTemplateEntry {
  category: string;
  name: string;
}
