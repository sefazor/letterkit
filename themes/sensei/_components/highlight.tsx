import { Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';

export interface EmailHighlightProps {
  tokens: ThemeTokens;
  label: string;
  value: string;
  large?: boolean;
}

/**
 * Key metric in accent blue — reference numbers, amounts, codes.
 */
export function EmailHighlight({ tokens, label, value, large = false }: EmailHighlightProps) {
  const t = tokens;

  return (
    <Section style={{ margin: `0 0 ${t.spacing.md}` }}>
      <Text
        style={{
          color: t.colors.mutedForeground,
          fontSize: t.fontSize.base,
          fontWeight: 700,
          lineHeight: '24px',
          margin: `0 0 ${t.spacing.xs}`,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: t.colors.primary,
          fontFamily: large ? t.fontFamily.heading : t.fontFamily.mono,
          fontSize: large ? '28px' : t.fontSize['2xl'],
          fontWeight: 600,
          letterSpacing: large ? '-0.02em' : '0.02em',
          lineHeight: large ? '36px' : '32px',
          margin: 0,
        }}
      >
        {value}
      </Text>
    </Section>
  );
}
