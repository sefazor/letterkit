import { Section, Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { getActiveGrundyTokens } from './token-context';

export interface EmailCalloutProps {
  children: ReactNode;
  title?: string;
}

/**
 * Accent panel with left terracotta rule for quotes, security notes, or highlights.
 */
export function EmailCallout({ children, title }: EmailCalloutProps) {
  const tokens = getActiveGrundyTokens();

  return (
    <Section
      className="email-accent"
      style={{
        backgroundColor: tokens.colors.accent,
        borderLeft: `3px solid ${tokens.colors.primary}`,
        borderRadius: 0,
        margin: `${tokens.spacing.lg} 0`,
        padding: tokens.spacing.md,
      }}
    >
      {title ? (
        <Text
          style={{
            color: tokens.colors.foreground,
            fontSize: tokens.fontSize.sm,
            fontWeight: 600,
            margin: `0 0 ${tokens.spacing.xs}`,
          }}
        >
          {title}
        </Text>
      ) : null}
      <Text
        className="email-muted"
        style={{
          color: tokens.colors.mutedForeground,
          fontSize: tokens.fontSize.sm,
          lineHeight: '22px',
          margin: 0,
        }}
      >
        {children}
      </Text>
    </Section>
  );
}
