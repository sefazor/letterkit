import { Text } from '@react-email/components';
import { FONT_MONO } from './fonts';
import { badgeStylesFor, type LifecycleBadgeVariant, getActiveLifecycleTokens } from './token-context';

export function LifecycleStatusBadge({
  children,
  variant = 'neutral',
}: {
  children: string;
  variant?: LifecycleBadgeVariant;
}) {
  const tokens = getActiveLifecycleTokens();
  const s = badgeStylesFor(tokens, variant);

  return (
    <Text
      style={{
        backgroundColor: s.bg,
        borderRadius: 2,
        color: s.text,
        display: 'inline-block',
        fontFamily: FONT_MONO,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.06em',
        lineHeight: '16px',
        margin: 0,
        padding: '3px 8px',
        textTransform: 'lowercase',
      }}
    >
      {children}
    </Text>
  );
}
