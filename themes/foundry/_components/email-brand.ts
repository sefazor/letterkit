import {
  letterkitBrand,
  resolveLetterkitLogoLightUrl,
} from '../../_brand';

/** Compact wordmark size for Foundry editorial header (33:10 SVG). */
export const FOUNDRY_LOGO_WIDTH = 46;
export const FOUNDRY_LOGO_HEIGHT = 14;

/**
 * Layout / shell props — header, footer, logo, legal.
 * Configure once in themes/foundry/brand.config.ts (not per template).
 * Design tokens: themes/foundry/tokens.config.ts
 */
export interface EmailBrandProps {
  appName: string;
  logoUrl?: string;
  logoAlt?: string;
  websiteUrl?: string;
  unsubscribeUrl?: string;
  termsUrl?: string;
  privacyUrl?: string;
  legalName?: string;
  companyAddress?: string;
  supportUrl?: string;
  copyrightYear?: number;
}

/** Display-only fallback — does not inject optional footer URLs. */
export function withEmailBrandDefaults(brand: EmailBrandProps): EmailBrandProps {
  return {
    ...brand,
    legalName: brand.legalName ?? brand.appName,
  };
}

/** Resolve logo for dark Foundry surfaces — swaps default black wordmark for white. */
export function resolveFoundryLogoUrl(logoUrl?: string, baseUrl?: string): string {
  return resolveLetterkitLogoLightUrl(logoUrl, baseUrl);
}

export function resolveFoundryLogoAlt(logoAlt?: string, appName?: string): string {
  return logoAlt ?? appName ?? letterkitBrand.logoAlt;
}
