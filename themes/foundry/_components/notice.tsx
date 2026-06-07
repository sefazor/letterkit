import { Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';
import type { ReactNode } from 'react';

export interface EmailNoticeProps {
  tokens: ThemeTokens;
  children: ReactNode;
}

/**
 * Subtle informational note — light blue tint, no heavy border.
 */
export function EmailNotice({ tokens, children }: EmailNoticeProps) {
  const t = tokens;

  return (
    <Section
      style={{
        backgroundColor: t.colors.accent,
        borderRadius: t.radius.md,
        margin: `${t.spacing.lg} 0 0`,
        padding: t.spacing.md,
      }}
    >
      <Text
        style={{
          color: t.colors.accentForeground,
          fontSize: t.fontSize.sm,
          lineHeight: '22px',
          margin: 0,
        }}
      >
        {children}
      </Text>
    </Section>
  );
}
