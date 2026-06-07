import { Column, Heading, Hr, Row, Section, Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { FONT_DISPLAY, FONT_MONO, FONT_SANS } from './fonts';
import { LifecycleStatusBadge } from './status-badge';
import { isPresent } from './present';
import type { LifecycleBadgeVariant } from './token-context';
import { getActiveLifecycleTokens } from './token-context';

export type LifecycleDataRow =
  | { label: string; value: string }
  | { label: string; badge: string; badgeVariant?: LifecycleBadgeVariant };

function rowHasContent(row: LifecycleDataRow): boolean {
  if (!isPresent(row.label)) return false;
  if ('badge' in row) return isPresent(row.badge);
  return isPresent(row.value);
}

export function LifecycleDataCard({
  rows,
  sectionLabel,
}: {
  rows: LifecycleDataRow[];
  sectionLabel?: string;
}) {
  const tokens = getActiveLifecycleTokens();
  const visible = rows.filter(rowHasContent);
  if (visible.length === 0) return null;

  return (
    <Section style={{ marginBottom: 44 }}>
      {isPresent(sectionLabel) ? (
        <Text
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            letterSpacing: '0.08em',
            color: tokens.muted,
            margin: '0 0 14px',
          }}
        >
          {sectionLabel}
        </Text>
      ) : null}
      {visible.map((row, i) => (
        <Section key={row.label} style={{ marginBottom: i < visible.length - 1 ? 0 : 0 }}>
          <Row style={{ marginBottom: 14 }}>
            <Column style={{ width: 32, verticalAlign: 'baseline' }}>
              <Text
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  color: tokens.muted,
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </Text>
            </Column>
            <Column style={{ verticalAlign: 'baseline' }}>
              <Text
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  color: tokens.muted,
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {row.label}
              </Text>
            </Column>
          </Row>
          {'badge' in row ? (
            <>
              <Heading
                as="h2"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 26,
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  color: tokens.ink,
                  margin: '0 0 12px',
                }}
              >
                {row.label}
              </Heading>
              <LifecycleStatusBadge variant={row.badgeVariant ?? 'neutral'}>
                {row.badge}
              </LifecycleStatusBadge>
            </>
          ) : (
            <>
              <Heading
                as="h2"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 26,
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  color: tokens.ink,
                  margin: '0 0 12px',
                }}
              >
                {row.label}
              </Heading>
              <Text
                style={{
                  color: tokens.body,
                  fontFamily: FONT_SANS,
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {row.value}
              </Text>
            </>
          )}
          {i < visible.length - 1 ? (
            <Hr
              style={{
                borderTop: `1px solid ${tokens.border}`,
                borderBottom: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                margin: '36px 0',
              }}
            />
          ) : null}
        </Section>
      ))}
    </Section>
  );
}

export function LifecycleInlineCode({ children }: { children: ReactNode }) {
  const tokens = getActiveLifecycleTokens();

  return (
    <span
      style={{
        backgroundColor: tokens.neutralBadgeBg,
        borderRadius: 2,
        color: tokens.ink,
        display: 'inline-block',
        fontFamily: FONT_MONO,
        fontSize: 11,
        letterSpacing: '0.04em',
        lineHeight: '16px',
        padding: '2px 6px',
        verticalAlign: 'baseline',
      }}
    >
      {children}
    </span>
  );
}
