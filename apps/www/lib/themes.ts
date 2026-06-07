import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render } from '@react-email/render';
import {
  getBlock,
  getTheme,
  listBlocksInTheme,
  listThemes,
  type Block,
  type Theme,
} from '@letterkit/registry';
import { isLetterkitDefaultLogo, letterkitLogoLightUrl, letterkitLogoUrl } from '../../../themes/_brand';
import type React from 'react';

const themesRoot = join(process.cwd(), '../../themes');

const BRAND_PROP_KEYS = [
  'appName',
  'logoUrl',
  'logoAlt',
  'websiteUrl',
  'unsubscribeUrl',
  'termsUrl',
  'privacyUrl',
  'legalName',
  'companyAddress',
  'supportUrl',
  'copyrightYear',
] as const;

function previewAssetBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL?.replace(/^/, 'https://') ??
    'http://localhost:3000'
  );
}

function isPlaceholderLogo(url: unknown): boolean {
  return (
    typeof url === 'string' &&
    (url.includes('placehold.co') || url.includes('placeholder') || url.includes('via.placeholder'))
  );
}

function mergeBrandLogo(
  brand: Record<string, unknown>,
  themeId?: string,
): Record<string, unknown> {
  const next = { ...brand };
  const logoUrl = next.logoUrl;
  const baseUrl = previewAssetBaseUrl();

  const usesLightLogo = themeId === 'foundry' || themeId === 'beacon';

  if (!logoUrl || isPlaceholderLogo(logoUrl)) {
    next.logoUrl = usesLightLogo ? letterkitLogoLightUrl(baseUrl) : letterkitLogoUrl(baseUrl);
  } else if (usesLightLogo && isLetterkitDefaultLogo(String(logoUrl)) && !String(logoUrl).includes('letterkit-logo-light.svg')) {
    next.logoUrl = letterkitLogoLightUrl(baseUrl);
  }
  next.logoAlt = next.logoAlt ?? 'Letterkit';

  return next;
}

function stripBrandKeys(props: Record<string, unknown>): Record<string, unknown> {
  const content = { ...props };
  delete content.brand;
  delete content.tokens;
  for (const key of BRAND_PROP_KEYS) {
    delete content[key];
  }
  return content;
}

function mergeThemeTokens(
  themeId: string,
  previewProps: Record<string, unknown>,
): Record<string, unknown> | undefined {
  const theme = getTheme(themeId);
  const themeTokens =
    theme?.defaultProps?.tokens && typeof theme.defaultProps.tokens === 'object'
      ? (theme.defaultProps.tokens as Record<string, unknown>)
      : {};

  const override =
    previewProps.tokens &&
    typeof previewProps.tokens === 'object' &&
    !Array.isArray(previewProps.tokens)
      ? (previewProps.tokens as Record<string, unknown>)
      : {};

  const merged = { ...themeTokens, ...override };
  return Object.keys(merged).length > 0 ? merged : undefined;
}

/**
 * Merge theme-level brand (once) with per-template content props.
 */
function mergePreviewProps(
  themeId: string,
  previewProps: Record<string, unknown>,
): Record<string, unknown> {
  const theme = getTheme(themeId);
  const themeBrand =
    theme?.defaultProps?.brand && typeof theme.defaultProps.brand === 'object'
      ? (theme.defaultProps.brand as Record<string, unknown>)
      : {};

  const override =
    previewProps.brand && typeof previewProps.brand === 'object' && !Array.isArray(previewProps.brand)
      ? (previewProps.brand as Record<string, unknown>)
      : {};

  const legacyBrand = Object.fromEntries(
    BRAND_PROP_KEYS.filter((key) => previewProps[key] !== undefined).map((key) => [
      key,
      previewProps[key],
    ]),
  );

  const content = stripBrandKeys(previewProps);
  const brand = mergeBrandLogo({ ...themeBrand, ...legacyBrand, ...override }, themeId);
  const tokens = mergeThemeTokens(themeId, previewProps);

  return tokens ? { ...content, brand, tokens } : { ...content, brand };
}

/**
 * Theme brand defaults with preview logo URL resolved.
 */
export function getResolvedThemeBrand(themeId: string): Record<string, unknown> {
  const theme = getTheme(themeId);
  const themeBrand =
    theme?.defaultProps?.brand && typeof theme.defaultProps.brand === 'object'
      ? (theme.defaultProps.brand as Record<string, unknown>)
      : {};

  return mergeBrandLogo({ ...themeBrand }, themeId);
}

/** Theme design token defaults for the Try panel. */
export function getResolvedThemeTokens(themeId: string): Record<string, unknown> {
  const theme = getTheme(themeId);
  const themeTokens =
    theme?.defaultProps?.tokens && typeof theme.defaultProps.tokens === 'object'
      ? (theme.defaultProps.tokens as Record<string, unknown>)
      : {};

  return { ...themeTokens };
}

/**
 * List all themes from the registry.
 */
export function getAllThemes(): Theme[] {
  return listThemes();
}

/**
 * Get a theme by id.
 */
export function getThemeById(id: string): Theme | undefined {
  return getTheme(id);
}

/**
 * List blocks in a theme.
 */
export function getThemeBlocks(themeId: string): Block[] {
  return listBlocksInTheme(themeId);
}

/**
 * Get a block within a theme.
 */
export function getThemeBlock(themeId: string, category: string, name: string): Block | undefined {
  return getBlock(themeId, category, name);
}

/**
 * Read template source from the themes directory.
 */
export function getTemplateSource(themeId: string, category: string, name: string): string {
  const sourcePath = join(themesRoot, themeId, category, name, 'index.tsx');
  return readFileSync(sourcePath, 'utf-8');
}

/**
 * Render a theme template to HTML using React Email.
 */
export async function renderTemplateHtml(
  themeId: string,
  category: string,
  name: string,
  props?: Record<string, unknown>,
): Promise<string> {
  const block = getThemeBlock(themeId, category, name);
  const rawProps = props ?? block?.previewProps ?? {};
  const previewProps = mergePreviewProps(themeId, rawProps as Record<string, unknown>);

  const mod = await import(`../../../themes/${themeId}/${category}/${name}/index`);
  const Component = mod.default as (props: Record<string, unknown>) => React.ReactElement;
  return render(Component(previewProps));
}
