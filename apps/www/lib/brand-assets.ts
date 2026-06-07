import { LETTERKIT_CDN_ORIGIN, letterkitBrand } from '../../../themes/_brand';

/** Marketing site logos — CDN in production, public/ fallback for offline dev. */
export const LETTERKIT_LOGO_SRC = `${LETTERKIT_CDN_ORIGIN}/${letterkitBrand.logoFile}`;
export const LETTERKIT_LOGO_LIGHT_SRC = `${LETTERKIT_CDN_ORIGIN}/${letterkitBrand.logoLightFile}`;
export const LETTERKIT_LOGO_ALT = 'Letterkit';

/** Wordmark aspect ratio from letterkit-logo.svg viewBox. */
export const LETTERKIT_LOGO_ASPECT = 1187 / 222;

export function letterkitLogoWidth(height: number): number {
  return Math.round(height * LETTERKIT_LOGO_ASPECT);
}
