import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { detectPackageManager, uniqueDependencies } from './install-deps.js';

const repoRoot = join(import.meta.dirname, '../../..');

describe('install-deps', () => {
  it('detects pnpm from lockfile', () => {
    expect(detectPackageManager(repoRoot)).toBe('pnpm');
  });

  it('deduplicates dependency list', () => {
    expect(
      uniqueDependencies(['@react-email/components', '@react-email/components', 'react']),
    ).toEqual(['@react-email/components', 'react']);
  });
});
