import { Link, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';

export interface EmailLinkFallbackProps {
  tokens: ThemeTokens;
  url: string;
  label?: string;
}

/**
 * Plain-text URL fallback for clients that strip buttons.
 */
export function EmailLinkFallback({ tokens, url, label = 'Or copy this link' }: EmailLinkFallbackProps) {
  const t = tokens;

  return (
    <Text
      style={{
        color: t.colors.mutedForeground,
        fontSize: t.fontSize.sm,
        lineHeight: '20px',
        margin: `${t.spacing.lg} 0 0`,
        wordBreak: 'break-all',
      }}
    >
      {label}:{' '}
      <Link href={url} style={{ color: t.colors.primary, textDecoration: 'none' }}>
        {url}
      </Link>
    </Text>
  );
}
