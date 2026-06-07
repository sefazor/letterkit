import { Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';
import type { ReactNode } from 'react';

export interface EmailBodyTextProps {
  tokens: ThemeTokens;
  children: ReactNode;
  muted?: boolean;
}

export function EmailBodyText({ tokens, children, muted = true }: EmailBodyTextProps) {
  return (
    <Text
      style={{
        color: muted ? tokens.colors.mutedForeground : tokens.colors.foreground,
        fontFamily: tokens.fontFamily.body,
        fontSize: tokens.fontSize.base,
        fontWeight: 400,
        lineHeight: '28px',
        margin: '0 0 28px',
        textAlign: 'left',
      }}
    >
      {children}
    </Text>
  );
}
