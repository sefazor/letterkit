import { Column, Row, Section, Text } from '@react-email/components';
import { getActiveBeaconPalette } from './token-context';

export interface InfoRow {
  label: string;
  value: string;
}

export interface EmailInfoCardProps {
  rows: InfoRow[];
}

export function EmailInfoCard({ rows }: EmailInfoCardProps) {
  const palette = getActiveBeaconPalette();

  return (
    <Section
      style={{
        backgroundColor: palette.surface,
        border: `1px solid ${palette.surfaceTint}`,
        borderRadius: 8,
        padding: '14px 18px',
        margin: '16px 0',
      }}
    >
      {rows.map((row, index) => (
        <Row key={row.label} style={{ paddingTop: index === 0 ? 0 : 6 }}>
          <Column align="left" style={{ verticalAlign: 'middle', width: '50%' }}>
            <Text
              style={{
                fontSize: 13,
                color: palette.body,
                margin: 0,
                textAlign: 'left',
              }}
            >
              {row.label}
            </Text>
          </Column>
          <Column align="right" style={{ verticalAlign: 'middle', width: '50%' }}>
            <Text
              style={{
                fontFamily: palette.fontMono,
                fontSize: 13,
                color: palette.ink,
                margin: 0,
                textAlign: 'right',
              }}
            >
              {row.value}
            </Text>
          </Column>
        </Row>
      ))}
    </Section>
  );
}
