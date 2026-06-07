import { Column, Row, Section, Text } from '@react-email/components';
import { isPresent } from './present';
import { getActiveLifecycleTokens } from './token-context';

export type LifecycleTotalRow = {
  label: string;
  value: string;
  emphasis?: boolean;
};

export function LifecycleTotals({ rows }: { rows: LifecycleTotalRow[] }) {
  const tokens = getActiveLifecycleTokens();
  const visible = rows.filter((row) => isPresent(row.label) && isPresent(row.value));
  if (visible.length === 0) return null;

  return (
    <Section
      style={{
        border: `1px solid ${tokens.border}`,
        borderRadius: 8,
        marginBottom: 28,
      }}
    >
      {visible.map((row, i) => (
        <Row
          key={row.label}
          style={{
            borderBottom: i < visible.length - 1 ? `1px solid ${tokens.border}` : undefined,
          }}
        >
          <Column style={{ padding: '14px 16px' }}>
            <Text
              style={{
                color: tokens.muted,
                fontFamily: tokens.fontFamily,
                fontSize: 13,
                lineHeight: '20px',
                margin: 0,
              }}
            >
              {row.label}
            </Text>
          </Column>
          <Column align="right" style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
            <Text
              style={{
                color: row.emphasis ? tokens.ink : tokens.body,
                fontFamily: tokens.fontFamily,
                fontSize: row.emphasis ? 18 : 13,
                fontWeight: row.emphasis ? 600 : 400,
                lineHeight: row.emphasis ? '24px' : '20px',
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
