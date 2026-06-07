import { Column, Row, Section, Text } from '@react-email/components';
import { getActiveGrundyTokens } from './token-context';

export interface TotalRow {
  label: string;
  value: string;
  emphasis?: boolean;
}

export interface EmailTotalsProps {
  rows: TotalRow[];
}

/**
 * Summary totals section with optional emphasized final row.
 */
export function EmailTotals({ rows }: EmailTotalsProps) {
  const tokens = getActiveGrundyTokens();

  return (
    <Section style={{ margin: `${tokens.spacing.md} 0` }}>
      {rows.map((row) => (
        <Row
          key={row.label}
          style={{
            borderTop: row.emphasis ? `2px solid ${tokens.colors.foreground}` : undefined,
            marginTop: row.emphasis ? tokens.spacing.sm : 0,
            padding: `${tokens.spacing.xs} 0`,
          }}
        >
          <Column style={{ width: '65%' }}>
            <Text
              style={{
                color: row.emphasis ? tokens.colors.foreground : tokens.colors.mutedForeground,
                fontSize: row.emphasis ? tokens.fontSize.base : tokens.fontSize.sm,
                fontWeight: row.emphasis ? 600 : 400,
                margin: 0,
              }}
            >
              {row.label}
            </Text>
          </Column>
          <Column style={{ width: '35%', textAlign: 'right' }}>
            <Text
              style={{
                color: tokens.colors.foreground,
                fontFamily: row.emphasis ? tokens.fontFamily.mono : tokens.fontFamily.body,
                fontSize: row.emphasis ? tokens.fontSize.lg : tokens.fontSize.sm,
                fontWeight: row.emphasis ? 600 : 400,
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
