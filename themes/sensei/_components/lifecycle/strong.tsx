import type { ReactNode } from 'react';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleStrong({ children }: { children: ReactNode }) {
  const tokens = getActiveLifecycleTokens();

  return <span style={{ color: tokens.ink, fontWeight: 500 }}>{children}</span>;
}
