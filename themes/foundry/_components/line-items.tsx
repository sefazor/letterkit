import { Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';
import { EmailHeading } from './heading';

export interface LineItem {
  name: string;
  detail?: string;
  amount: string;
}

export interface EmailLineItemsProps {
  tokens: ThemeTokens;
  title: string;
  items: LineItem[];
}

/**
 * SaaS line items — plan, seats, usage rows.
 */
export function EmailLineItems({ tokens, title, items }: EmailLineItemsProps) {
  const t = tokens;

  return (
    <Section style={{ margin: `${t.spacing.md} 0` }}>
      <EmailHeading tokens={t}>{title}</EmailHeading>
      {items.map((item) => (
        <Section
          key={item.name}
          style={{
            borderBottom: `1px solid ${t.colors.border}`,
            margin: `0 0 ${t.spacing.sm}`,
            padding: `0 0 ${t.spacing.sm}`,
          }}
        >
          <Text
            style={{
              color: t.colors.mutedForeground,
              fontSize: t.fontSize.base,
              fontWeight: 700,
              lineHeight: '24px',
              margin: `0 0 2px`,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              color: '#9CA3AF',
              fontSize: t.fontSize.sm,
              lineHeight: '20px',
              margin: 0,
            }}
          >
            {item.detail ? `${item.detail} · ` : ''}
            {item.amount}
          </Text>
        </Section>
      ))}
    </Section>
  );
}
