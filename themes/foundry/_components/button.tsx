import { Button as EmailButton } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';
import type { ReactNode } from 'react';

export interface EmailButtonProps {
  tokens: ThemeTokens;
  href: string;
  children: ReactNode;
}

/**
 * Primary CTA — PAYTORE-style blue pill button.
 */
export function EmailButtonLink({ tokens, href, children }: EmailButtonProps) {
  const t = tokens;

  return (
    <EmailButton
      href={href}
      style={{
        backgroundColor: t.colors.primary,
        borderRadius: t.radius.md,
        color: t.colors.primaryForeground,
        display: 'inline-block',
        fontFamily: t.fontFamily.body,
        fontSize: t.fontSize.base,
        fontWeight: 700,
        lineHeight: '24px',
        padding: '14px 32px',
        textAlign: 'center',
        textDecoration: 'none',
      }}
    >
      {children}
    </EmailButton>
  );
}
