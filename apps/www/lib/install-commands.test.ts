import { describe, expect, it } from 'vitest';
import {
  buildTemplateInstallCommand,
  buildTemplatesInstallCommand,
  buildThemeInstallCommand,
} from './install-commands';

describe('install-commands', () => {
  it('builds a single template command', () => {
    expect(buildTemplateInstallCommand('grundy', { category: 'auth', name: 'otp-code' })).toBe(
      'npx letterkit add grundy/auth/otp-code',
    );
  });

  it('joins multiple template commands', () => {
    expect(
      buildTemplatesInstallCommand('grundy', [
        { category: 'auth', name: 'otp-code' },
        { category: 'auth', name: 'password-reset' },
      ]),
    ).toBe(
      'npx letterkit add grundy/auth/otp-code && npx letterkit add grundy/auth/password-reset',
    );
  });

  it('builds theme install command', () => {
    expect(buildThemeInstallCommand('foundry')).toBe('npx letterkit theme add foundry');
  });
});
