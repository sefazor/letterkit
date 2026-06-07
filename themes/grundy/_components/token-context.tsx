import type { ThemeTokens } from '@letterkit/theme';
import {
  grundyPaletteToThemeTokens,
  grundyTokens,
  mergeGrundyTokens,
  type GrundyPaletteTokens,
  type PartialGrundyTokens,
} from '../tokens.config';

let activePalette: GrundyPaletteTokens = grundyTokens;
let activeThemeTokens: ThemeTokens = grundyPaletteToThemeTokens(grundyTokens);

/** Set palette for the current email render (called by EmailLayout). */
export function setActiveGrundyTokens(palette: GrundyPaletteTokens): void {
  activePalette = palette;
  activeThemeTokens = grundyPaletteToThemeTokens(palette);
}

export function getActiveGrundyPalette(): GrundyPaletteTokens {
  return activePalette;
}

export function getActiveGrundyTokens(): ThemeTokens {
  return activeThemeTokens;
}

export function resolveGrundyTokens(override?: PartialGrundyTokens): GrundyPaletteTokens {
  return mergeGrundyTokens(grundyTokens, override);
}
