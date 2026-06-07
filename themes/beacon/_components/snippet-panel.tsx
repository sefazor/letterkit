import { Column, Row, Section, Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { getActiveBeaconPalette, getActiveBeaconTokens } from './token-context';

export interface EmailSnippetPanelProps {
  author: string;
  children: ReactNode;
  /** Right-column stamp label (e.g. Thread, Channel). */
  stampLabel?: string;
  /** Right-column stamp value. Falls back to `context` when omitted. */
  stampValue?: string;
  /** @deprecated Use stampLabel + stampValue. */
  context?: string;
  footnote?: string;
}

/**
 * Message excerpt — mini forest stamp header + quote body (no side borders).
 */
export function EmailSnippetPanel({
  author,
  children,
  stampLabel = 'Thread',
  stampValue,
  context,
  footnote,
}: EmailSnippetPanelProps) {
  const palette = getActiveBeaconPalette();
  const tokens = getActiveBeaconTokens();
  const resolvedStamp = stampValue ?? context;

  return (
    <Section
      style={{
        border: `1px solid ${palette.surfaceTint}`,
        borderRadius: 8,
        margin: '16px 0',
        overflow: 'hidden',
      }}
    >
      <Section style={{ backgroundColor: palette.forest, padding: '12px 18px' }}>
        <Row>
          <Column align="left" style={{ verticalAlign: 'middle', width: '50%' }}>
            <Text
              style={{
                color: palette.forestMuted,
                fontFamily: palette.fontMono,
                fontSize: 10,
                margin: '0 0 4px',
                textAlign: 'left',
              }}
            >
              From
            </Text>
            <Text
              style={{
                color: palette.forestText,
                fontFamily: palette.fontMono,
                fontSize: 12,
                margin: 0,
                textAlign: 'left',
              }}
            >
              {author}
            </Text>
          </Column>
          {resolvedStamp ? (
            <Column align="right" style={{ verticalAlign: 'middle', width: '50%' }}>
              <Text
                style={{
                  color: palette.forestMuted,
                  fontFamily: palette.fontMono,
                  fontSize: 10,
                  margin: '0 0 4px',
                  textAlign: 'right',
                }}
              >
                {stampLabel}
              </Text>
              <Text
                style={{
                  color: palette.forestText,
                  fontFamily: palette.fontMono,
                  fontSize: 12,
                  margin: 0,
                  textAlign: 'right',
                }}
              >
                {resolvedStamp}
              </Text>
            </Column>
          ) : null}
        </Row>
      </Section>
      <Section style={{ backgroundColor: palette.card, padding: '16px 18px' }}>
        <Text
          style={{
            color: palette.ink,
            fontFamily: tokens.fontFamily.body,
            fontSize: 15,
            lineHeight: '24px',
            margin: 0,
            textAlign: 'left',
          }}
        >
          {children}
        </Text>
        {footnote ? (
          <Text
            style={{
              color: palette.muted,
              fontFamily: palette.fontMono,
              fontSize: 11,
              margin: '10px 0 0',
              textAlign: 'left',
            }}
          >
            {footnote}
          </Text>
        ) : null}
      </Section>
    </Section>
  );
}
