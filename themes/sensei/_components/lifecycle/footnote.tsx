import { Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { isPresent } from './present';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleFootnote({ children }: { children: ReactNode }) {
  const tokens = getActiveLifecycleTokens();

  if (typeof children === 'string' && !isPresent(children)) return null;

  return (
    <Text
      style={{
        color: tokens.mutedSoft,
        fontFamily: tokens.fontFamily,
        fontSize: 12,
        lineHeight: 1.6,
        margin: '0 0 32px',
      }}
    >
      {children}
    </Text>
  );
}
