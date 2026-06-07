import { Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { isPresent } from './present';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleQuote({ children }: { children: ReactNode }) {
  const tokens = getActiveLifecycleTokens();

  if (typeof children === 'string' && !isPresent(children)) return null;

  return (
    <Text
      style={{
        borderLeft: `3px solid ${tokens.border}`,
        color: tokens.body,
        fontFamily: tokens.fontFamily,
        fontSize: 14,
        fontStyle: 'italic',
        lineHeight: 1.6,
        margin: '0 0 28px',
        paddingLeft: 16,
      }}
    >
      &ldquo;{children}&rdquo;
    </Text>
  );
}
