import { Section, Text } from '@react-email/components';
import { isPresent } from './present';
import { getActiveBeaconTokens } from './token-context';

export function EmailCodeDisplay({
  code,
  expiresIn,
}: {
  code?: string;
  expiresIn?: string;
}) {
  const tokens = getActiveBeaconTokens();

  if (!isPresent(code)) return null;

  return (
    <Section style={{ margin: `${tokens.spacing.lg} 0` }}>
      <Text
        style={{
          color: tokens.colors.mutedForeground,
          fontSize: tokens.fontSize.sm,
          margin: `0 0 ${tokens.spacing.sm}`,
        }}
      >
        Your code
      </Text>
      <Text
        style={{
          backgroundColor: tokens.colors.muted,
          border: `1px solid ${tokens.colors.border}`,
          color: tokens.colors.foreground,
          display: 'inline-block',
          fontFamily: tokens.fontFamily.mono,
          fontSize: tokens.fontSize['2xl'],
          fontWeight: 600,
          lineHeight: '36px',
          margin: `0 0 ${tokens.spacing.sm}`,
          padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
        }}
      >
        {code}
      </Text>
      {isPresent(expiresIn) ? (
        <Text
          style={{
            color: tokens.colors.mutedForeground,
            fontSize: tokens.fontSize.sm,
            lineHeight: '22px',
            margin: 0,
          }}
        >
          Expires in {expiresIn}
        </Text>
      ) : null}
    </Section>
  );
}
