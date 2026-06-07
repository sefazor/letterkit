/** Marketing + static assets in apps/www/public (keep in sync with themes/_brand). */
export const LETTERKIT_LOGO_SRC = '/letterkit-logo.svg';
export const LETTERKIT_LOGO_LIGHT_SRC = '/letterkit-logo-light.svg';
export const LETTERKIT_LOGO_ALT = 'Letterkit';

/** Wordmark aspect ratio from letterkit-logo.svg viewBox. */
export const LETTERKIT_LOGO_ASPECT = 1187 / 222;

export function letterkitLogoWidth(height: number): number {
  return Math.round(height * LETTERKIT_LOGO_ASPECT);
}
