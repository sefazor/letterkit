/**
 * Letterkit brand assets — shared across all themes.
 *
 * Source files: themes/_brand/letterkit-logo.svg (+ light variant)
 * Production CDN: https://cdn.letterkit.dev/letterkit-logo.svg
 * Local dev fallback: /brand/* route on www
 */

export const LETTERKIT_CDN_ORIGIN = 'https://cdn.letterkit.dev';

export const letterkitBrand = {
  appName: 'Letterkit',
  logoAlt: 'Letterkit',
  logoFile: 'letterkit-logo.svg',
  logoLightFile: 'letterkit-logo-light.svg',
  /** Served by apps/www /brand/* in local dev */
  localLogoPath: '/brand/letterkit-logo.svg',
  localLogoLightPath: '/brand/letterkit-logo-light.svg',
} as const;

/** Wordmark dimensions for email <Img> (matches letterkit-logo.svg viewBox). */
export const LETTERKIT_LOGO_WIDTH = 118;
export const LETTERKIT_LOGO_HEIGHT = 22;

function cdnOrigin(): string {
  const fromEnv =
    typeof process !== 'undefined' ? process.env.LETTERKIT_CDN_URL?.replace(/\/$/, '') : undefined;
  return fromEnv || LETTERKIT_CDN_ORIGIN;
}

function useLocalBrandAssets(assetBase?: string): boolean {
  return Boolean(assetBase?.includes('localhost') || assetBase?.startsWith('http://127'));
}

/**
 * Absolute logo URL for email <Img src="...">.
 * Production uses CDN; localhost uses /brand/* proxy.
 */
export function letterkitLogoUrl(assetBase?: string): string {
  if (useLocalBrandAssets(assetBase)) {
    return `${assetBase!.replace(/\/$/, '')}${letterkitBrand.localLogoPath}`;
  }
  return `${cdnOrigin()}/${letterkitBrand.logoFile}`;
}

/** White wordmark for dark email surfaces (Beacon, Foundry). */
export function letterkitLogoLightUrl(assetBase?: string): string {
  if (useLocalBrandAssets(assetBase)) {
    return `${assetBase!.replace(/\/$/, '')}${letterkitBrand.localLogoLightPath}`;
  }
  return `${cdnOrigin()}/${letterkitBrand.logoLightFile}`;
}

/** True when the URL is missing or still the default black wordmark. */
export function isLetterkitDefaultLogo(url?: string): boolean {
  if (!url) return true;
  return url.includes('letterkit-logo.svg') && !url.includes('letterkit-logo-light');
}

export function isLetterkitLightLogo(url?: string): boolean {
  return Boolean(url?.includes('letterkit-logo-light.svg'));
}

export function previewOriginFromLogoUrl(url?: string): string | undefined {
  if (!url?.startsWith('http')) return undefined;
  try {
    return new URL(url).origin;
  } catch {
    return undefined;
  }
}

/** Resolve logo URL — keeps custom URLs, injects CDN wordmark when missing/default. */
export function resolveLetterkitLogoUrl(logoUrl?: string, assetBase?: string): string {
  if (logoUrl && !isLetterkitDefaultLogo(logoUrl)) {
    return logoUrl;
  }
  return letterkitLogoUrl(assetBase ?? previewOriginFromLogoUrl(logoUrl));
}

/** Dark-surface themes: swap default black wordmark for white. */
export function resolveLetterkitLogoLightUrl(logoUrl?: string, assetBase?: string): string {
  if (isLetterkitLightLogo(logoUrl)) {
    return logoUrl!;
  }
  if (logoUrl && !isLetterkitDefaultLogo(logoUrl)) {
    return logoUrl;
  }
  return letterkitLogoLightUrl(assetBase ?? previewOriginFromLogoUrl(logoUrl));
}

/** Default props merged into every template preview and send call. */
export const letterkitDefaultProps = {
  appName: letterkitBrand.appName,
  logoUrl: letterkitLogoUrl(),
  logoAlt: letterkitBrand.logoAlt,
} as const;
