import { Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';

export interface EmailChecklistProps {
  tokens: ThemeTokens;
  items: string[];
}

/** Confirmed steps or security improvements — 2FA enabled, recovery setup. */
export function EmailChecklist({ tokens, items }: EmailChecklistProps) {
  const t = tokens;

  return (
    <Section style={{ margin: '0 0 28px', textAlign: 'left' }}>
      {items.map((item) => (
        <Text
          key={item}
          style={{
            color: t.colors.foreground,
            fontFamily: t.fontFamily.body,
            fontSize: t.fontSize.base,
            lineHeight: '28px',
            margin: '0 0 4px',
          }}
        >
          <span style={{ color: t.colors.primary, fontWeight: 700 }}>✓</span> {item}
        </Text>
      ))}
    </Section>
  );
}
