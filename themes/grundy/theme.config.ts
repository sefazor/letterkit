import type { ThemeConfig } from '@letterkit/theme';
import { grundyPaletteToThemeTokens, grundyTokens } from './tokens.config';

export const grundy: ThemeConfig = {
  id: 'grundy',
  name: 'Grundy',
  tagline: 'Quiet, confident, modern.',
  description:
    'A minimal serif-meets-mono theme with cream backgrounds, ink typography, and terracotta accents. Typography-driven, no illustrations.',
  author: 'letterkit',
  tier: 'free',
  tokens: grundyPaletteToThemeTokens(grundyTokens),
};

export default grundy;
