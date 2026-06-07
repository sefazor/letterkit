import { Link, Section, Text } from '@react-email/components';
import { getActiveBeaconTokens } from './token-context';

export interface EmailLinkFallbackProps {
  url: string;
  label?: string;
}

/**
 * Monospace URL fallback block for clients that strip buttons.
 */
export function EmailLinkFallback({ url, label = 'Or copy this link' }: EmailLinkFallbackProps) {
  const tokens = getActiveBeaconTokens();

  return (
    <Section style={{ marginTop: tokens.spacing.md }}>
      <Text
        className="email-muted"
        style={{
          color: tokens.colors.mutedForeground,
          fontSize: tokens.fontSize.xs,
          margin: `0 0 ${tokens.spacing.xs}`,
        }}
      >
        {label}
      </Text>
      <Section
        className="email-accent"
        style={{
          backgroundColor: tokens.colors.muted,
          border: `1px solid ${tokens.colors.border}`,
          borderRadius: 0,
          padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
        }}
      >
        <Link
          href={url}
          style={{
            color: tokens.colors.foreground,
            fontFamily: tokens.fontFamily.mono,
            fontSize: tokens.fontSize.xs,
            lineHeight: '18px',
            textDecoration: 'none',
            wordBreak: 'break-all',
          }}
        >
          {url}
        </Link>
      </Section>
    </Section>
  );
}
