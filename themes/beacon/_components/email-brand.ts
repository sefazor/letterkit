/**
 * Layout / shell props — header, footer, logo, legal.
 * Configure once in themes/beacon/brand.config.ts (not per template).
 */
export interface EmailBrandProps {
  appName: string;
  logoUrl?: string;
  logoAlt?: string;
  websiteUrl?: string;
  unsubscribeUrl?: string;
  termsUrl?: string;
  privacyUrl?: string;
  preferencesUrl?: string;
  legalName?: string;
  companyAddress?: string;
  supportUrl?: string;
  copyrightYear?: number;
}

export function withEmailBrandDefaults(brand: EmailBrandProps): EmailBrandProps {
  return {
    ...brand,
    legalName: brand.legalName ?? brand.appName,
    preferencesUrl: brand.preferencesUrl ?? brand.unsubscribeUrl,
  };
}
