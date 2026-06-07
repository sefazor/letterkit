import { Text } from '@react-email/components';
import { badgeStylesFor, type LifecycleBadgeVariant, getActiveLifecycleTokens } from './token-context';

export function LifecycleStatusBadge({
  children,
  variant = 'success',
}: {
  children: string;
  variant?: LifecycleBadgeVariant;
}) {
  const tokens = getActiveLifecycleTokens();
  const s = badgeStylesFor(tokens, variant);

  return (
    <span
      style={{
        backgroundColor: s.bg,
        borderRadius: 999,
        color: s.text,
        display: 'inline-block',
        fontFamily: tokens.fontFamily,
        fontSize: 12,
        fontWeight: 500,
        lineHeight: '18px',
        padding: '3px 10px 3px 8px',
      }}
    >
      <span
        style={{
          backgroundColor: s.dot,
          borderRadius: 999,
          display: 'inline-block',
          height: 6,
          marginRight: 6,
          verticalAlign: 'middle',
          width: 6,
        }}
      />
      {children}
    </span>
  );
}
