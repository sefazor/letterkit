import { Link, Text } from '@react-email/components';
import { isPresent } from './present';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleSecurityNote({
  secureAccountUrl,
  supportUrl,
}: {
  secureAccountUrl?: string;
  supportUrl?: string;
}) {
  const tokens = getActiveLifecycleTokens();
  const linkStyle = {
    color: tokens.accent,
    fontWeight: 500,
    textDecoration: 'none' as const,
  };

  const hasSecure = isPresent(secureAccountUrl);
  const hasSupport = isPresent(supportUrl);
  if (!hasSecure && !hasSupport) return null;

  return (
    <Text
      style={{
        color: tokens.muted,
        fontFamily: tokens.fontFamily,
        fontSize: 13,
        lineHeight: 1.6,
        margin: '0 0 32px',
      }}
    >
      If you didn&apos;t make this change,{' '}
      {hasSecure ? (
        <Link href={secureAccountUrl} style={linkStyle}>
          secure your account
        </Link>
      ) : null}
      {hasSecure && hasSupport ? ' or ' : null}
      {hasSupport ? (
        <Link href={supportUrl} style={linkStyle}>
          contact support
        </Link>
      ) : null}
      .
    </Text>
  );
}
