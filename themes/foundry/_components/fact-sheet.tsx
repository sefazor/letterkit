import { Hr, Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';

export interface FactSheetRow {
  label: string;
  value: string;
}

export interface EmailFactSheetProps {
  tokens: ThemeTokens;
  rows: FactSheetRow[];
}

/** Stripe-style metadata — dividers only, no colored boxes. */
export function EmailFactSheet({ tokens, rows }: EmailFactSheetProps) {
  const t = tokens;
  const rule = {
    border: 'none',
    borderTop: `1px solid ${t.colors.border}`,
    margin: 0,
  };

  return (
    <Section style={{ margin: '0 0 32px', textAlign: 'left' }}>
      {rows.map((row, i) => (
        <Section key={row.label}>
          <Hr style={{ ...rule, margin: i === 0 ? '0 0 16px' : '16px 0' }} />
          <Text
            style={{
              color: '#9CA3AF',
              fontFamily: t.fontFamily.body,
              fontSize: t.fontSize.sm,
              lineHeight: '18px',
              margin: '0 0 4px',
            }}
          >
            {row.label}
          </Text>
          <Text
            style={{
              color: t.colors.foreground,
              fontFamily: t.fontFamily.body,
              fontSize: t.fontSize.base,
              fontWeight: 600,
              lineHeight: '24px',
              margin: 0,
            }}
          >
            {row.value}
          </Text>
        </Section>
      ))}
      <Hr style={{ ...rule, margin: '16px 0 0' }} />
    </Section>
  );
}
