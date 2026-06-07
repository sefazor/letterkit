import type { ThemeConfig } from '@letterkit/theme';
import { beaconPaletteToThemeTokens, beaconTokens } from './tokens.config';

export const beacon: ThemeConfig = {
  id: 'beacon',
  name: 'Beacon',
  tagline: 'For SaaS that handles money like it matters.',
  description:
    'Confident fintech feel. Forest signature, mono numerals, structured billing layouts. Built for receipts, invoices, and payment lifecycle.',
  author: 'letterkit',
  tier: 'free',
  tokens: beaconPaletteToThemeTokens(beaconTokens),
};

export default beacon;
