import { Section, Text } from '@react-email/components';
import { isPresent } from './present';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleCodeDisplay({
  code,
  expiresIn,
}: {
  code?: string;
  expiresIn?: string;
}) {
  const tokens = getActiveLifecycleTokens();

  if (!isPresent(code)) return null;

  return (
    <Section style={{ marginBottom: 28 }}>
      <Text
        style={{
          color: tokens.muted,
          fontFamily: tokens.fontFamily,
          fontSize: 13,
          lineHeight: '20px',
          margin: '0 0 8px',
        }}
      >
        Your code
      </Text>
      <Text
        style={{
          color: tokens.accent,
          fontFamily: 'Courier New, Courier, monospace',
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: '0.14em',
          lineHeight: '44px',
          margin: '0 0 8px',
        }}
      >
        {code}
      </Text>
      {isPresent(expiresIn) ? (
        <Text
          style={{
            color: tokens.mutedSoft,
            fontFamily: tokens.fontFamily,
            fontSize: 12,
            lineHeight: '18px',
            margin: 0,
          }}
        >
          Expires in {expiresIn}
        </Text>
      ) : null}
    </Section>
  );
}
