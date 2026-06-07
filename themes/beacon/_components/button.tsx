import { Button as EmailButton } from '@react-email/components';
import type { ReactNode } from 'react';
import { getActiveBeaconTokens } from './token-context';

export interface EmailButtonProps {
  href: string;
  children: ReactNode;
  fullWidth?: boolean;
}

export function EmailButtonLink({ href, children, fullWidth = false }: EmailButtonProps) {
  const t = getActiveBeaconTokens();

  return (
    <EmailButton
      href={href}
      style={{
        backgroundColor: t.colors.primary,
        borderRadius: 7,
        color: t.colors.primaryForeground,
        display: fullWidth ? 'block' : 'inline-block',
        fontFamily: t.fontFamily.body,
        fontSize: t.fontSize.base,
        fontWeight: 500,
        margin: fullWidth ? '0 auto' : undefined,
        padding: '12px 26px',
        textAlign: 'center',
        textDecoration: 'none',
      }}
    >
      {children}
    </EmailButton>
  );
}

export function EmailButtonOutline({ href, children }: EmailButtonProps) {
  const t = getActiveBeaconTokens();

  return (
    <EmailButton
      href={href}
      style={{
        backgroundColor: 'transparent',
        border: `1px solid ${t.colors.border}`,
        borderRadius: 7,
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
