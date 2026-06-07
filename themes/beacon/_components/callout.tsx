import { Section, Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { getActiveBeaconPalette, getActiveBeaconTokens } from './token-context';

export interface EmailCalloutProps {
  children: ReactNode;
  title?: string;
}

/**
 * Forest stamp note block — title band on top, body below.
 */
export function EmailCallout({ children, title }: EmailCalloutProps) {
  const palette = getActiveBeaconPalette();
  const tokens = getActiveBeaconTokens();

  return (
    <Section
      style={{
        border: `1px solid ${palette.surfaceTint}`,
        borderRadius: 8,
        margin: '16px 0',
        overflow: 'hidden',
      }}
    >
      {title ? (
        <Section style={{ backgroundColor: palette.forest, padding: '10px 18px' }}>
          <Text
            style={{
              color: palette.forestMuted,
              fontFamily: palette.fontMono,
              fontSize: 10,
              margin: '0 0 4px',
              textAlign: 'left',
            }}
          >
            Note
          </Text>
          <Text
            style={{
              color: palette.forestText,
              fontFamily: tokens.fontFamily.body,
              fontSize: 13,
              fontWeight: 500,
              margin: 0,
              textAlign: 'left',
            }}
          >
            {title}
          </Text>
        </Section>
      ) : null}
      <Section
        style={{
          backgroundColor: palette.surface,
          padding: '14px 18px',
        }}
      >
        <Text
          style={{
            color: palette.body,
            fontFamily: tokens.fontFamily.body,
            fontSize: tokens.fontSize.sm,
            lineHeight: '20px',
            margin: 0,
            textAlign: 'left',
          }}
        >
          {children}
        </Text>
      </Section>
    </Section>
  );
}
