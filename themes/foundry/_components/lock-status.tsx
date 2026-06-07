import { Hr, Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';

export interface EmailLockStatusProps {
  tokens: ThemeTokens;
  autoUnlockIn: string;
  reason?: string;
}

/** Account lock countdown — typography + dividers, no tinted box. */
export function EmailLockStatus({
  tokens,
  autoUnlockIn,
  reason = 'Too many failed sign-in attempts',
}: EmailLockStatusProps) {
  const t = tokens;
  const rule = {
    border: 'none',
    borderTop: `1px solid ${t.colors.border}`,
    margin: '28px 0',
  };

  return (
    <Section style={{ margin: '0 0 8px', textAlign: 'left' }}>
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
        {reason}
      </Text>
      <Text
        style={{
          color: '#9CA3AF',
          fontFamily: t.fontFamily.body,
          fontSize: t.fontSize.sm,
          lineHeight: '18px',
          margin: '0 0 4px',
        }}
      >
        Auto unlock in
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
        {autoUnlockIn}
      </Text>
      <Hr style={{ ...rule, margin: '0 0 28px' }} />
    </Section>
  );
}
