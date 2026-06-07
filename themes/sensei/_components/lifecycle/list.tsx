import { Section, Text } from '@react-email/components';
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
    <Section style={{ marginBottom: 28 }}>
      {visible.map((item, i) => (
        <Text
          key={item}
          style={{
            color: tokens.body,
            fontFamily: tokens.fontFamily,
            fontSize: 14,
            lineHeight: 1.6,
            margin: i < visible.length - 1 ? '0 0 8px' : 0,
          }}
        >
          <span style={{ color: tokens.accent, fontWeight: 500 }}>
            {ordered ? `${i + 1}.` : '✓'}
          </span>{' '}
          {item}
        </Text>
      ))}
    </Section>
  );
}
