import { Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';

export interface TotalRow {
  label: string;
  value: string;
  emphasis?: boolean;
}

export interface EmailTotalsProps {
  tokens: ThemeTokens;
  rows: TotalRow[];
}

/**
 * Billing totals with blue emphasis on the final row.
 */
export function EmailTotals({ tokens, rows }: EmailTotalsProps) {
  const t = tokens;

  return (
    <Section style={{ margin: `${t.spacing.md} 0` }}>
      {rows.map((row) => (
        <Section key={row.label} style={{ margin: `0 0 ${t.spacing.sm}` }}>
          <Text
            style={{
              color: t.colors.mutedForeground,
              fontSize: t.fontSize.base,
              fontWeight: 700,
              lineHeight: '24px',
              margin: `0 0 2px`,
            }}
          >
            {row.label}
          </Text>
          <Text
            style={{
              color: row.emphasis ? t.colors.primary : '#9CA3AF',
              fontFamily: row.emphasis ? t.fontFamily.heading : t.fontFamily.body,
              fontSize: row.emphasis ? t.fontSize['2xl'] : t.fontSize.base,
              fontWeight: row.emphasis ? 600 : 400,
              lineHeight: row.emphasis ? '32px' : '24px',
              margin: 0,
            }}
          >
            {row.value}
          </Text>
        </Section>
      ))}
    </Section>
  );
}
