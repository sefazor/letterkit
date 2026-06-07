import { Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { FONT_SANS } from './fonts';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleLede({ children }: { children: ReactNode }) {
  const tokens = getActiveLifecycleTokens();

  return (
    <Text
      style={{
        color: tokens.body,
        fontFamily: FONT_SANS,
        fontSize: 15,
        lineHeight: 1.6,
        margin: '0 0 40px',
        maxWidth: 440,
      }}
    >
      {children}
    </Text>
  );
}
