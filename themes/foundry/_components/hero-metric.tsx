import { Hr, Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';

export interface EmailHeroMetricProps {
  tokens: ThemeTokens;
  label: string;
  value: string;
}

export function EmailHeroMetric({ tokens, label, value }: EmailHeroMetricProps) {
  const t = tokens;
  const rule = {
    border: 'none',
    borderTop: `1px solid ${t.colors.border}`,
    margin: '28px 0',
  };

  return (
    <Section style={{ textAlign: 'left', margin: '0 0 8px' }}>
      <Hr style={rule} />
      <Text
        style={{
          color: t.colors.mutedForeground,
          fontFamily: t.fontFamily.body,
          fontSize: t.fontSize.base,
          fontWeight: 700,
          lineHeight: '24px',
          margin: '0 0 8px',
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: t.colors.primary,
          fontFamily: t.fontFamily.heading,
          fontSize: t.fontSize['2xl'],
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: '44px',
          margin: '0 0 24px',
        }}
      >
        {value}
      </Text>
      <Hr style={{ ...rule, margin: '0 0 28px' }} />
    </Section>
  );
}
