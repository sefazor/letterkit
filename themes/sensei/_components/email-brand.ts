import { letterkitBrand, resolveLetterkitLogoUrl } from '../../_brand';

/**
 * Layout / shell props — header, footer, logo, legal.
 * Configure once in themes/sensei/brand.config.ts (not per template).
 * Design tokens: themes/sensei/tokens.config.ts
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
    logoUrl: resolveLetterkitLogoUrl(brand.logoUrl),
    logoAlt: brand.logoAlt ?? letterkitBrand.logoAlt,
  };
}
