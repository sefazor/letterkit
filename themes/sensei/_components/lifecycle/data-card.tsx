import { Column, Row, Section, Text } from '@react-email/components';
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

export function LifecycleDataCard({ rows }: { rows: LifecycleDataRow[] }) {
  const tokens = getActiveLifecycleTokens();
  const visible = rows.filter(rowHasContent);
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
            {'badge' in row ? (
              <LifecycleStatusBadge variant={row.badgeVariant ?? 'success'}>
                {row.badge}
              </LifecycleStatusBadge>
            ) : (
              <Text
                style={{
                  color: tokens.ink,
                  fontFamily: tokens.fontFamily,
                  fontSize: 13,
                  lineHeight: '20px',
                  margin: 0,
                }}
              >
                {row.value}
              </Text>
            )}
          </Column>
        </Row>
      ))}
    </Section>
  );
}
