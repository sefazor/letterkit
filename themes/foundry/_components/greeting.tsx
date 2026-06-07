import { Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';
import type { ReactNode } from 'react';

export interface EmailGreetingProps {
  tokens: ThemeTokens;
  children: ReactNode;
}

export function EmailGreeting({ tokens, children }: EmailGreetingProps) {
  return (
    <Text
      style={{
        color: tokens.colors.foreground,
        fontFamily: tokens.fontFamily.heading,
        fontSize: tokens.fontSize.lg,
        fontWeight: 700,
        lineHeight: '30px',
        margin: '0 0 16px',
        textAlign: 'left',
      }}
    >
      {children}
    </Text>
  );
}
