import { Button as EmailButton } from '@react-email/components';
import type { ReactNode } from 'react';
import { getActiveGrundyTokens } from './token-context';

export interface EmailButtonProps {
  href: string;
  children: ReactNode;
  fullWidth?: boolean;
}

/**
 * Primary CTA button using Grundy terracotta accent.
 */
export function EmailButtonLink({ href, children, fullWidth = false }: EmailButtonProps) {
  const t = getActiveGrundyTokens();

  return (
    <EmailButton
      className="email-btn"
      href={href}
      style={{
        backgroundColor: t.colors.primary,
        borderRadius: 0,
        color: t.colors.primaryForeground,
        display: 'block',
        fontFamily: t.fontFamily.body,
        fontSize: t.fontSize.base,
        fontWeight: 600,
        margin: fullWidth ? '0 auto' : undefined,
        maxWidth: fullWidth ? '100%' : undefined,
        padding: `${t.spacing.md} ${t.spacing.xl}`,
        textAlign: 'center',
        textDecoration: 'none',
        width: fullWidth ? '100%' : 'auto',
      }}
    >
      {children}
    </EmailButton>
  );
}

/**
 * Secondary outline button for alternate actions.
 */
export function EmailButtonOutline({ href, children }: EmailButtonProps) {
  const t = getActiveGrundyTokens();

  return (
    <EmailButton
      href={href}
      style={{
        backgroundColor: 'transparent',
        border: `1px solid ${t.colors.border}`,
        borderRadius: 0,
        color: t.colors.foreground,
        display: 'inline-block',
        fontFamily: t.fontFamily.body,
        fontSize: t.fontSize.sm,
        fontWeight: 500,
        padding: `${t.spacing.sm} ${t.spacing.lg}`,
        textDecoration: 'none',
      }}
    >
      {children}
    </EmailButton>
  );
}
