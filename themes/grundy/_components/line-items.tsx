import { Column, Row, Section, Text } from '@react-email/components';
import { getActiveGrundyTokens } from './token-context';

export interface LineItem {
  name: string;
  detail?: string;
  amount: string;
}

export interface EmailLineItemsProps {
  items: LineItem[];
  title?: string;
}

/**
 * Itemized list for invoices, orders, and digests.
 */
export function EmailLineItems({ items, title }: EmailLineItemsProps) {
  const tokens = getActiveGrundyTokens();

  return (
    <Section style={{ margin: `${tokens.spacing.lg} 0` }}>
      {title ? (
        <Text
          style={{
            borderBottom: `2px solid ${tokens.colors.foreground}`,
            color: tokens.colors.foreground,
            fontSize: tokens.fontSize.xs,
            fontWeight: 600,
            margin: `0 0 ${tokens.spacing.md}`,
            paddingBottom: tokens.spacing.xs,
          }}
        >
          {title}
        </Text>
      ) : null}
      {items.map((item, index) => (
        <Row
          key={`${item.name}-${index}`}
          className="email-border"
          style={{
            borderBottom: `1px solid ${tokens.colors.border}`,
            padding: `${tokens.spacing.sm} 0`,
          }}
        >
          <Column style={{ width: '68%', verticalAlign: 'top' }}>
            <Text
              style={{
                color: tokens.colors.foreground,
                fontSize: tokens.fontSize.sm,
                fontWeight: 600,
                margin: `0 0 ${item.detail ? tokens.spacing.xs : 0}`,
              }}
            >
              {item.name}
            </Text>
            {item.detail ? (
              <Text
                className="email-muted"
                style={{
                  color: tokens.colors.mutedForeground,
                  fontSize: tokens.fontSize.xs,
                  margin: 0,
                }}
              >
                {item.detail}
              </Text>
            ) : null}
          </Column>
          <Column style={{ width: '32%', textAlign: 'right', verticalAlign: 'top' }}>
            <Text
              style={{
                color: tokens.colors.foreground,
                fontFamily: tokens.fontFamily.mono,
                fontSize: tokens.fontSize.sm,
                fontWeight: 600,
                margin: 0,
              }}
            >
              {item.amount}
            </Text>
          </Column>
        </Row>
      ))}
    </Section>
  );
}
