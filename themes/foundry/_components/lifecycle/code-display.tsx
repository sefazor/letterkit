import { Section, Text } from '@react-email/components';
import { FONT_MONO, FONT_SANS } from './fonts';
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
    <Section style={{ marginBottom: 40 }}>
      <Text
        style={{
          color: tokens.muted,
          fontFamily: FONT_MONO,
          fontSize: 11,
          letterSpacing: '0.08em',
          lineHeight: '16px',
          margin: '0 0 12px',
        }}
      >
        Your code
      </Text>
      <Text
        style={{
          backgroundColor: tokens.neutralBadgeBg,
          borderRadius: 2,
          color: tokens.ink,
          display: 'inline-block',
          fontFamily: FONT_MONO,
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: '0.12em',
          lineHeight: '32px',
          margin: '0 0 12px',
          padding: '8px 16px',
        }}
      >
        {code}
      </Text>
      {isPresent(expiresIn) ? (
        <Text
          style={{
            color: tokens.muted,
            fontFamily: FONT_SANS,
            fontSize: 13,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Expires in {expiresIn}
        </Text>
      ) : null}
    </Section>
  );
}
