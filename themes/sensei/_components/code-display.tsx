import { Hr, Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';

export interface EmailCodeDisplayProps {
  tokens: ThemeTokens;
  code: string;
  expiresIn?: string;
}

/** OTP focal point — large type between dividers, no gray box. */
export function EmailCodeDisplay({ tokens, code, expiresIn }: EmailCodeDisplayProps) {
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
          margin: '0 0 12px',
        }}
      >
        Your code
      </Text>
      <Text
        style={{
          color: t.colors.primary,
          fontFamily: t.fontFamily.mono,
          fontSize: '42px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          lineHeight: '52px',
          margin: '0 0 8px',
        }}
      >
        {code}
      </Text>
      {expiresIn ? (
        <Text
          style={{
            color: '#9CA3AF',
            fontFamily: t.fontFamily.body,
            fontSize: t.fontSize.sm,
            lineHeight: '20px',
            margin: '0 0 24px',
          }}
        >
          Expires in {expiresIn}
        </Text>
      ) : null}
      <Hr style={{ ...rule, margin: '0 0 28px' }} />
    </Section>
  );
}
