import type { ThemeTokens } from '@letterkit/theme';
import {
  beaconPaletteToThemeTokens,
  beaconTokens,
  mergeBeaconTokens,
  type BeaconPaletteTokens,
  type PartialBeaconTokens,
} from '../tokens.config';

let activePalette: BeaconPaletteTokens = beaconTokens;
let activeThemeTokens: ThemeTokens = beaconPaletteToThemeTokens(beaconTokens);

/** Set palette for the current email render (called by EmailLayout). */
export function setActiveBeaconTokens(palette: BeaconPaletteTokens): void {
  activePalette = palette;
  activeThemeTokens = beaconPaletteToThemeTokens(palette);
}

export function getActiveBeaconPalette(): BeaconPaletteTokens {
  return activePalette;
}

export function getActiveBeaconTokens(): ThemeTokens {
  return activeThemeTokens;
}

export function resolveBeaconTokens(override?: PartialBeaconTokens): BeaconPaletteTokens {
  return mergeBeaconTokens(beaconTokens, override);
}
