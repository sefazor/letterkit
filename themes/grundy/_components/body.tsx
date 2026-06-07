import { Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { getActiveGrundyTokens } from './token-context';

export interface EmailBodyTextProps {
  children: ReactNode;
  muted?: boolean;
}

/**
 * Body copy with Grundy line-height and spacing.
 */
export function EmailBodyText({ children, muted = false }: EmailBodyTextProps) {
  const tokens = getActiveGrundyTokens();

  return (
    <Text
      className={muted ? 'email-muted' : 'email-fg'}
      style={{
        color: muted ? tokens.colors.mutedForeground : tokens.colors.foreground,
        fontSize: tokens.fontSize.base,
        lineHeight: '26px',
        margin: `0 0 ${tokens.spacing.md}`,
      }}
    >
      {children}
    </Text>
  );
}
