/**
 * Letterkit brand assets — shared across all themes.
 *
 * Put your logo SVG here:
 *   themes/_brand/letterkit-logo.svg
 *
 * It is served at /brand/letterkit-logo.svg during www preview.
 * In production emails, use an absolute HTTPS URL to the same file on your CDN.
 */

export const letterkitBrand = {
  appName: 'Letterkit',
  logoAlt: 'Letterkit',
  /** Path relative to your asset host (www, CDN, etc.) */
  logoPath: '/brand/letterkit-logo.svg',
  /** White wordmark for dark email surfaces (e.g. Foundry, Beacon). */
  logoLightPath: '/brand/letterkit-logo-light.svg',
} as const;

/** Wordmark dimensions for email <Img> (matches letterkit-logo.svg viewBox). */
export const LETTERKIT_LOGO_WIDTH = 118;
export const LETTERKIT_LOGO_HEIGHT = 22;

/**
 * Build an absolute logo URL for email <Img src="...">.
 * Email clients require HTTPS — never use relative paths in sent mail.
 */
export function letterkitLogoUrl(baseUrl = 'https://letterkit.dev'): string {
  return `${baseUrl.replace(/\/$/, '')}${letterkitBrand.logoPath}`;
}

/** White wordmark — use on dark backgrounds where the default black logo is invisible. */
export function letterkitLogoLightUrl(baseUrl = 'https://letterkit.dev'): string {
  return `${baseUrl.replace(/\/$/, '')}${letterkitBrand.logoLightPath}`;
}

/** True when the URL is missing or uses the default black wordmark path. */
export function isLetterkitDefaultLogo(url?: string): boolean {
  if (!url) return true;
  return url.includes('/brand/letterkit-logo.svg');
}

export function isLetterkitLightLogo(url?: string): boolean {
  return Boolean(url?.includes('/brand/letterkit-logo-light.svg'));
}

export function previewOriginFromLogoUrl(url?: string): string | undefined {
  if (!url?.startsWith('http')) return undefined;
  try {
    return new URL(url).origin;
  } catch {
    return undefined;
  }
}

/** Resolve logo URL — keeps preview/CDN URLs, injects default wordmark when missing. */
export function resolveLetterkitLogoUrl(logoUrl?: string, baseUrl?: string): string {
  if (logoUrl && !isLetterkitDefaultLogo(logoUrl)) {
    return logoUrl;
  }
  const origin = baseUrl ?? previewOriginFromLogoUrl(logoUrl);
  return letterkitLogoUrl(origin);
}

/** Dark-surface themes: swap default black wordmark for white. */
export function resolveLetterkitLogoLightUrl(logoUrl?: string, baseUrl?: string): string {
  if (isLetterkitLightLogo(logoUrl)) {
    return logoUrl!;
  }
  if (logoUrl && !isLetterkitDefaultLogo(logoUrl)) {
    return logoUrl;
  }
  const origin = baseUrl ?? previewOriginFromLogoUrl(logoUrl);
  return letterkitLogoLightUrl(origin);
}

/** Default props merged into every template preview and send call. */
export const letterkitDefaultProps = {
  appName: letterkitBrand.appName,
  logoUrl: letterkitLogoUrl(),
  logoAlt: letterkitBrand.logoAlt,
} as const;
