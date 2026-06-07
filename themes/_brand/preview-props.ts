import { letterkitBrand } from './index';

/** Shared brand fields for template preview.tsx files — logoUrl is injected at render time. */
export const letterkitPreviewBrand = {
  appName: letterkitBrand.appName,
  logoAlt: letterkitBrand.logoAlt,
} as const;
