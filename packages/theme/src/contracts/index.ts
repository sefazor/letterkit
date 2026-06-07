import { TEMPLATE_CONTRACT, getContractEntries } from '../contract.js';
import { SENSEI_TEMPLATE_CONTRACT, getSenseiContractEntries } from './sensei.js';

export type ThemeContract = Record<string, readonly string[]>;

const THEME_CONTRACTS: Record<string, ThemeContract> = {
  grundy: TEMPLATE_CONTRACT,
  beacon: TEMPLATE_CONTRACT,
  sensei: SENSEI_TEMPLATE_CONTRACT,
  foundry: SENSEI_TEMPLATE_CONTRACT,
};

/**
 * Return the template contract for a theme. Unknown themes use the default 52-template contract.
 */
export function getThemeContract(themeId: string): ThemeContract {
  return THEME_CONTRACTS[themeId] ?? TEMPLATE_CONTRACT;
}

export function getThemeContractEntries(themeId: string): Array<{ category: string; name: string }> {
  if (themeId === 'sensei' || themeId === 'foundry') return getSenseiContractEntries();
  return getContractEntries();
}

export { SENSEI_TEMPLATE_CONTRACT, getSenseiContractEntries };
