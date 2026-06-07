import type { EmailBrandProps } from './_components/email-brand';

/**
 * Brand / layout shell — configure once per project.
 * Design colors: themes/sensei/tokens.config.ts
 * Logo URL is injected at preview/send time (see apps/www/lib/themes.ts).
 */
export const senseiBrand: EmailBrandProps = {
  appName: 'letterkit',
  websiteUrl: 'acme.com',
  unsubscribeUrl: 'https://app.acme.com/preferences',
  termsUrl: 'https://acme.com/terms',
  privacyUrl: 'https://acme.com/privacy',
  legalName: 'Acme Inc',
  companyAddress: '350 Mission St, San Francisco, CA',
  supportUrl: 'https://app.acme.com/support',
  copyrightYear: 2026,
};
