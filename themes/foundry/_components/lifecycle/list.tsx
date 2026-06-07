import { Section, Text } from '@react-email/components';
import { FONT_MONO, FONT_SANS } from './fonts';
import { isPresent } from './present';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleList({
  items,
  ordered = false,
}: {
  items: string[];
  ordered?: boolean;
}) {
  const tokens = getActiveLifecycleTokens();
  const visible = items.filter(isPresent);
  if (visible.length === 0) return null;

  return (
    <Section style={{ marginBottom: 40 }}>
      {visible.map((item, i) => (
        <Text
          key={item}
          style={{
            color: tokens.body,
            fontFamily: FONT_SANS,
            fontSize: 14,
            lineHeight: 1.6,
            margin: i < visible.length - 1 ? '0 0 12px' : 0,
          }}
        >
          <span
            style={{
              color: tokens.muted,
              display: 'inline-block',
              fontFamily: FONT_MONO,
              fontSize: 11,
              letterSpacing: '0.06em',
              marginRight: 10,
              minWidth: ordered ? 20 : 12,
            }}
          >
            {ordered ? String(i + 1).padStart(2, '0') : '—'}
          </span>
          {item}
        </Text>
      ))}
    </Section>
  );
}
