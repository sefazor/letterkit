import { Link, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';
import type { ReactNode } from 'react';

export interface EmailAsideProps {
  tokens: ThemeTokens;
  children: ReactNode;
  helpEmail?: string;
}

export function EmailAside({ tokens, children, helpEmail }: EmailAsideProps) {
  const linkStyle = { color: tokens.colors.primary, textDecoration: 'none' };

  return (
    <Text
      style={{
        color: '#9CA3AF',
        fontFamily: tokens.fontFamily.body,
        fontSize: tokens.fontSize.sm,
        lineHeight: '22px',
        margin: '0 0 8px',
        textAlign: 'left',
      }}
    >
      {children}
      {helpEmail ? (
        <>
          {' '}
          <Link href={`mailto:${helpEmail}`} style={linkStyle}>
            {helpEmail}
          </Link>
        </>
      ) : null}
    </Text>
  );
}
