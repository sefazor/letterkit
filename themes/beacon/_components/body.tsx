import { Text } from '@react-email/components';
import type { ReactNode } from 'react';
import { getActiveBeaconPalette, getActiveBeaconTokens } from './token-context';

export interface EmailBodyTextProps {
  children: ReactNode;
  muted?: boolean;
  /** Tighter bottom margin for stacked list items. */
  compact?: boolean;
}

/**
 * Body copy with Beacon line-height and spacing.
 */
export function EmailBodyText({ children, muted = false, compact = false }: EmailBodyTextProps) {
  const tokens = getActiveBeaconTokens();
  const palette = getActiveBeaconPalette();

  return (
    <Text
      className={muted ? 'email-muted' : 'email-fg'}
      style={{
        color: muted ? palette.muted : palette.body,
        fontFamily: tokens.fontFamily.body,
        fontSize: tokens.fontSize.base,
        lineHeight: '22px',
        margin: compact ? '0 0 6px' : '0 0 12px',
        textAlign: 'left',
      }}
    >
      {children}
    </Text>
  );
}
