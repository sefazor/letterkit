import { Heading, Section, Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { getActiveBeaconPalette, getActiveBeaconTokens } from './token-context';

export interface EmailHeadingProps {
  children: ReactNode;
  subtitle?: string;
  /** Center only for billing-style hero headlines. */
  centered?: boolean;
}

export function EmailHeading({ children, subtitle, centered = false }: EmailHeadingProps) {
  const tokens = getActiveBeaconTokens();
  const palette = getActiveBeaconPalette();
  const align = centered ? 'center' : 'left';

  const content = (
    <>
      <Heading
        style={{
          color: palette.ink,
          fontFamily: tokens.fontFamily.heading,
          fontSize: tokens.fontSize['2xl'],
          fontWeight: 500,
          lineHeight: 1.2,
          margin: `0 0 ${subtitle ? 10 : tokens.spacing.md}`,
          textAlign: align,
        }}
      >
        {children}
      </Heading>
      {subtitle ? (
        <Text
          style={{
            color: palette.body,
            fontFamily: tokens.fontFamily.body,
            fontSize: tokens.fontSize.lg,
            lineHeight: 1.4,
            margin: '0 0 12px',
            textAlign: align,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </>
  );

  if (centered) {
    return <Section style={{ marginBottom: 36 }}>{content}</Section>;
  }

  return <Section style={{ marginBottom: 16, textAlign: 'left' }}>{content}</Section>;
}
