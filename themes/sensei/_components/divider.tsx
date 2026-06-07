import { Hr } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';

export interface EmailDividerProps {
  tokens: ThemeTokens;
}

/**
 * Thin horizontal rule between sections.
 */
export function EmailDivider({ tokens }: EmailDividerProps) {
  return (
    <Hr
      style={{
        border: 'none',
        borderTop: `1px solid ${tokens.colors.border}`,
        margin: `${tokens.spacing.lg} 0`,
      }}
    />
  );
}
