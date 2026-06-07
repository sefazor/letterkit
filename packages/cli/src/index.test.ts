import { describe, expect, it } from 'vitest';
import { LetterkitConfigSchema } from './config.js';
import { resolveBlockArg } from './commands/add.js';

describe('@letterkit/cli', () => {
  it('parses default config schema with defaultTheme', () => {
    const config = LetterkitConfigSchema.parse({});
    expect(config.defaultTheme).toBe('grundy');
    expect(config.components).toBe('./components/emails');
  });

  it('resolves 2-segment path with defaultTheme', () => {
    const result = resolveBlockArg('auth/verify-email', 'grundy');
    expect(result).toEqual({ themeId: 'grundy', category: 'auth', name: 'verify-email' });
  });

  it('resolves 3-segment path explicitly', () => {
    const result = resolveBlockArg('grundy/auth/verify-email', 'other');
    expect(result).toEqual({ themeId: 'grundy', category: 'auth', name: 'verify-email' });
  });
});
