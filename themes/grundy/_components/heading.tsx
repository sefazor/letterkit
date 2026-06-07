import { Heading, Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { getActiveGrundyTokens } from './token-context';

export interface EmailHeadingProps {
  children: ReactNode;
  subtitle?: string;
}

/**
 * Serif display heading with optional muted subtitle.
 */
export function EmailHeading({ children, subtitle }: EmailHeadingProps) {
  const tokens = getActiveGrundyTokens();

  return (
    <>
      <Heading
        className="email-fg"
        style={{
          color: tokens.colors.foreground,
          fontFamily: tokens.fontFamily.heading,
          fontSize: tokens.fontSize['2xl'],
          fontWeight: 600,
          lineHeight: '1.2',
          margin: `0 0 ${subtitle ? tokens.spacing.xs : tokens.spacing.md}`,
        }}
      >
        {children}
      </Heading>
      {subtitle ? (
        <Text
          className="email-muted"
          style={{
            color: tokens.colors.mutedForeground,
            fontSize: tokens.fontSize.sm,
            lineHeight: '20px',
            margin: `0 0 ${tokens.spacing.lg}`,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </>
  );
}
