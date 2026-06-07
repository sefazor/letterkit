import { Heading } from '@react-email/components';
import type { ReactNode } from 'react';
import { FONT_DISPLAY } from './fonts';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleTitle({
  children,
  size = 'h2',
}: {
  children: ReactNode;
  size?: 'hero' | 'h2' | 'h3';
}) {
  const tokens = getActiveLifecycleTokens();

  const scale = {
    hero: { fontSize: 56, lineHeight: 0.96, letterSpacing: '-0.045em', margin: '0 0 28px' },
    h2: { fontSize: 26, lineHeight: 1.15, letterSpacing: '-0.025em', margin: '0 0 12px' },
    h3: { fontSize: 22, lineHeight: 1.25, letterSpacing: '-0.02em', margin: '0 0 20px' },
  }[size];

  return (
    <Heading
      as={size === 'hero' ? 'h1' : 'h2'}
      style={{
        color: tokens.ink,
        fontFamily: FONT_DISPLAY,
        fontSize: scale.fontSize,
        fontWeight: 500,
        letterSpacing: scale.letterSpacing,
        lineHeight: scale.lineHeight,
        margin: scale.margin,
      }}
    >
      {children}
    </Heading>
  );
}
