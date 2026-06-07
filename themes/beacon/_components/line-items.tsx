import { Column, Row, Section, Text } from '@react-email/components';
import { getActiveBeaconPalette } from './token-context';

export interface LineItem {
  description?: string;
  name?: string;
  detail?: string;
  amount: string;
}

export interface EmailLineItemsProps {
  items: LineItem[];
  title?: string;
}

export function EmailLineItems({ items, title }: EmailLineItemsProps) {
  const palette = getActiveBeaconPalette();

  return (
    <Section style={{ borderTop: title ? undefined : `1px solid ${palette.border}`, paddingTop: title ? 0 : 16 }}>
      {title ? (
        <Text
          style={{
            color: palette.ink,
            fontSize: 12,
            fontWeight: 500,
            margin: '0 0 12px',
            textAlign: 'left',
          }}
        >
          {title}
        </Text>
      ) : null}
      {items.map((item, index) => {
        const label = item.description ?? item.name ?? '';
        return (
          <Row key={`${label}-${index}`} style={{ padding: '6px 0' }}>
            <Column align="left" style={{ verticalAlign: 'middle', width: '68%' }}>
              <Text style={{ fontSize: 14, color: palette.ink, margin: 0, textAlign: 'left' }}>
                {label}
              </Text>
              {item.detail ? (
                <Text
                  style={{
                    fontSize: 12,
                    color: palette.muted,
                    margin: '4px 0 0',
                    textAlign: 'left',
                  }}
                >
                  {item.detail}
                </Text>
              ) : null}
            </Column>
            <Column align="right" style={{ verticalAlign: 'middle', width: '32%' }}>
              <Text
                style={{
                  fontFamily: palette.fontMono,
                  fontSize: 14,
                  color: palette.ink,
                  margin: 0,
                  textAlign: 'right',
                }}
              >
                {item.amount}
              </Text>
            </Column>
          </Row>
        );
      })}
    </Section>
  );
}
