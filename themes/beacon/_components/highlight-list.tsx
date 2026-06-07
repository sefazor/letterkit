import { Column, Row, Section, Text } from '@react-email/components';
import { getActiveBeaconPalette, getActiveBeaconTokens } from './token-context';

export interface EmailHighlightListProps {
  title: string;
  items: string[];
}

/**
 * Digest highlights — forest title band + numbered rows.
 */
export function EmailHighlightList({ title, items }: EmailHighlightListProps) {
  const palette = getActiveBeaconPalette();
  const tokens = getActiveBeaconTokens();

  return (
    <Section
      style={{
        border: `1px solid ${palette.surfaceTint}`,
        borderRadius: 8,
        margin: '16px 0',
        overflow: 'hidden',
      }}
    >
      <Section style={{ backgroundColor: palette.forest, padding: '10px 18px' }}>
        <Text
          style={{
            color: palette.forestText,
            fontFamily: tokens.fontFamily.body,
            fontSize: 12,
            fontWeight: 500,
            margin: 0,
            textAlign: 'left',
          }}
        >
          {title}
        </Text>
      </Section>
      <Section style={{ backgroundColor: palette.card, padding: '4px 0' }}>
        {items.map((item, index) => (
          <Row key={`${item}-${index}`} style={{ padding: '10px 18px' }}>
            <Column style={{ verticalAlign: 'top', width: 28 }}>
              <Text
                style={{
                  color: palette.forest,
                  fontFamily: palette.fontMono,
                  fontSize: 11,
                  margin: 0,
                  textAlign: 'left',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </Text>
            </Column>
            <Column style={{ verticalAlign: 'top' }}>
              <Text
                style={{
                  color: palette.body,
                  fontFamily: tokens.fontFamily.body,
                  fontSize: 14,
                  lineHeight: '22px',
                  margin: 0,
                  textAlign: 'left',
                }}
              >
                {item}
              </Text>
            </Column>
          </Row>
        ))}
      </Section>
    </Section>
  );
}
