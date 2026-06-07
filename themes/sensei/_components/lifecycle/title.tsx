import { Heading } from '@react-email/components';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleTitle({ children }: { children: string }) {
  const tokens = getActiveLifecycleTokens();

  return (
    <Heading
      style={{
        color: tokens.ink,
        fontFamily: tokens.fontFamily,
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        lineHeight: '28px',
        margin: '0 0 16px',
      }}
    >
      {children}
    </Heading>
  );
}
