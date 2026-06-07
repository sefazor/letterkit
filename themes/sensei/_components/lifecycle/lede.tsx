import { Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleLede({ children }: { children: ReactNode }) {
  const tokens = getActiveLifecycleTokens();

  return (
    <Text
      style={{
        color: tokens.body,
        fontFamily: tokens.fontFamily,
        fontSize: 15,
        lineHeight: '24px',
        margin: '0 0 28px',
      }}
    >
      {children}
    </Text>
  );
}
