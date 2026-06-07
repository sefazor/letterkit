import type { ThemeConfig } from '@letterkit/theme';
import { beaconPaletteToThemeTokens, beaconTokens } from './tokens.config';

export const beacon: ThemeConfig = {
  id: 'beacon',
  name: 'Beacon',
  tagline: 'For SaaS that handles money like it matters.',
  description:
    'Premium fintech feel. Forest signature, mono numerals, structured billing layouts. Built for receipts, invoices, and payment lifecycle.',
  author: 'letterkit',
  tier: 'pro',
  tokens: beaconPaletteToThemeTokens(beaconTokens),
};

export default beacon;
