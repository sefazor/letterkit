import { Column, Row, Section, Text } from '@react-email/components';
import { getActiveGrundyTokens } from './token-context';

export interface InfoRow {
  label: string;
  value: string;
}

export interface EmailInfoCardProps {
  rows: InfoRow[];
  title?: string;
}

/**
 * Key-value metadata card for receipts, orders, and account details.
 */
export function EmailInfoCard({ rows, title }: EmailInfoCardProps) {
  const tokens = getActiveGrundyTokens();

  return (
    <Section
      className="email-accent"
      style={{
        backgroundColor: tokens.colors.muted,
        border: `1px solid ${tokens.colors.border}`,
        borderRadius: 0,
        margin: `${tokens.spacing.lg} 0`,
        padding: tokens.spacing.md,
      }}
    >
      {title ? (
        <Text
          style={{
            color: tokens.colors.foreground,
            fontFamily: tokens.fontFamily.heading,
            fontSize: tokens.fontSize.lg,
            fontWeight: 600,
            margin: `0 0 ${tokens.spacing.md}`,
          }}
        >
          {title}
        </Text>
      ) : null}
      {rows.map((row, index) => (
        <Row
          key={row.label}
          style={{
            borderBottom: index < rows.length - 1 ? `1px solid ${tokens.colors.border}` : undefined,
            padding: `${tokens.spacing.xs} 0`,
          }}
        >
          <Column style={{ width: '40%' }}>
            <Text
              className="email-muted"
              style={{
                color: tokens.colors.mutedForeground,
                fontSize: tokens.fontSize.xs,
                margin: 0,
              }}
            >
              {row.label}
            </Text>
          </Column>
          <Column style={{ width: '60%', textAlign: 'right' }}>
            <Text
              style={{
                color: tokens.colors.foreground,
                fontFamily: tokens.fontFamily.mono,
                fontSize: tokens.fontSize.sm,
                margin: 0,
              }}
            >
              {row.value}
            </Text>
          </Column>
        </Row>
      ))}
    </Section>
  );
}
