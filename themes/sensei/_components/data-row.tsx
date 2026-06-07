import { Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';

export interface EmailDataRowProps {
  tokens: ThemeTokens;
  label: string;
  value: string;
  highlight?: boolean;
}

/**
 * Label–value row for customer, billing, and account details.
 */
export function EmailDataRow({ tokens, label, value, highlight = false }: EmailDataRowProps) {
  const t = tokens;

  return (
    <Section style={{ margin: `0 0 ${t.spacing.sm}` }}>
      <Text
        style={{
          color: t.colors.mutedForeground,
          fontSize: t.fontSize.base,
          fontWeight: 700,
          lineHeight: '24px',
          margin: `0 0 2px`,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: highlight ? t.colors.primary : '#9CA3AF',
          fontSize: t.fontSize.base,
          fontWeight: highlight ? 600 : 400,
          lineHeight: '24px',
          margin: 0,
        }}
      >
        {value}
      </Text>
    </Section>
  );
}
