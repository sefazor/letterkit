import { Button, Section } from '@react-email/components';
import { FONT_SANS } from './fonts';
import { isPresent } from './present';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleCta({ href, label }: { href?: string; label?: string }) {
  const tokens = getActiveLifecycleTokens();

  if (!isPresent(href) || !isPresent(label)) return null;

  return (
    <Section style={{ marginBottom: 40 }}>
      <Button
        href={href}
        style={{
          backgroundColor: tokens.accent,
          borderRadius: 3,
          color: tokens.accentForeground,
          display: 'inline-block',
          fontFamily: FONT_SANS,
          fontSize: 14,
          fontWeight: 500,
          padding: '11px 20px',
          textDecoration: 'none',
        }}
      >
        {label}
      </Button>
    </Section>
  );
}
