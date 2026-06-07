import { Hr, Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';

export interface EmailChangeDisplayProps {
  tokens: ThemeTokens;
  fromEmail: string;
  toEmail: string;
}

/** Old → new email — divider rows, no fill. */
export function EmailChangeDisplay({ tokens, fromEmail, toEmail }: EmailChangeDisplayProps) {
  const t = tokens;
  const rule = {
    border: 'none',
    borderTop: `1px solid ${t.colors.border}`,
    margin: '16px 0',
  };

  return (
    <Section style={{ margin: '0 0 32px', textAlign: 'left' }}>
      <Hr style={{ ...rule, margin: '0 0 16px' }} />
      <Text
        style={{
          color: '#9CA3AF',
          fontFamily: t.fontFamily.body,
          fontSize: t.fontSize.sm,
          lineHeight: '18px',
          margin: '0 0 4px',
        }}
      >
        Current
      </Text>
      <Text
        style={{
          color: t.colors.mutedForeground,
          fontFamily: t.fontFamily.body,
          fontSize: t.fontSize.base,
          lineHeight: '24px',
          margin: 0,
          textDecoration: 'line-through',
        }}
      >
        {fromEmail}
      </Text>
      <Hr style={rule} />
      <Text
        style={{
          color: '#9CA3AF',
          fontFamily: t.fontFamily.body,
          fontSize: t.fontSize.sm,
          lineHeight: '18px',
          margin: '0 0 4px',
        }}
      >
        New
      </Text>
      <Text
        style={{
          color: t.colors.primary,
          fontFamily: t.fontFamily.body,
          fontSize: t.fontSize.base,
          fontWeight: 700,
          lineHeight: '24px',
          margin: 0,
        }}
      >
        {toEmail}
      </Text>
      <Hr style={{ ...rule, margin: '16px 0 0' }} />
    </Section>
  );
}
