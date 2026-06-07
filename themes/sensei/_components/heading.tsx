import { Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';
import type { ReactNode } from 'react';

export interface EmailHeadingProps {
  tokens: ThemeTokens;
  children: ReactNode;
}

/**
 * Section title — bold gray, left-aligned.
 */
export function EmailHeading({ tokens, children }: EmailHeadingProps) {
  return (
    <Text
      style={{
        color: tokens.colors.mutedForeground,
        fontSize: tokens.fontSize.base,
        fontWeight: 700,
        lineHeight: '24px',
        margin: `0 0 ${tokens.spacing.md}`,
      }}
    >
      {children}
    </Text>
  );
}
