import { Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { FONT_MONO } from './fonts';
import { isPresent } from './present';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleCaption({ children }: { children: ReactNode }) {
  const tokens = getActiveLifecycleTokens();

  if (typeof children === 'string' && !isPresent(children)) return null;

  return (
    <Text
      style={{
        color: tokens.muted,
        fontFamily: FONT_MONO,
        fontSize: 11,
        letterSpacing: '0.06em',
        lineHeight: 1.6,
        margin: '0 0 24px',
      }}
    >
      {children}
    </Text>
  );
}
