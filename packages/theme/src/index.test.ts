import { describe, expect, it } from 'vitest';
import { getContractEntries, TEMPLATE_CONTRACT } from './contract.js';
import { getSenseiContractEntries } from './contracts/sensei.js';
import { validateTheme } from './validate.js';

describe('@letterkit/theme', () => {
  it('TEMPLATE_CONTRACT defines exactly 52 templates', () => {
    expect(getContractEntries()).toHaveLength(52);
  });

  it('SENSEI contract defines exactly 137 templates', () => {
    expect(getSenseiContractEntries()).toHaveLength(137);
  });

  it('validateTheme passes when all grundy entries present', () => {
    const entries = getContractEntries();
    expect(() => validateTheme('grundy', entries)).not.toThrow();
  });

  it('validateTheme throws when entries are missing', () => {
    expect(() => validateTheme('grundy', [{ category: 'auth', name: 'verify-email' }])).toThrow(
      /violates template contract/,
    );
  });

  it('covers all 8 default categories', () => {
    expect(Object.keys(TEMPLATE_CONTRACT)).toHaveLength(8);
  });
});
