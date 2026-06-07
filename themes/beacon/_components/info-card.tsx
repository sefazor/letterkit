import { Column, Row, Section, Text } from '@react-email/components';
import { getActiveBeaconPalette, getActiveBeaconTokens } from './token-context';

export interface InfoRow {
  label: string;
  value: string;
}

export interface EmailInfoCardProps {
  title?: string;
  rows: InfoRow[];
}

function InfoRows({ rows }: { rows: InfoRow[] }) {
  const palette = getActiveBeaconPalette();

  return (
    <>
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
    </>
  );
}

export function EmailInfoCard({ title, rows }: EmailInfoCardProps) {
  const palette = getActiveBeaconPalette();
  const tokens = getActiveBeaconTokens();

  if (title) {
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
        <Section
          style={{
            backgroundColor: palette.surface,
            padding: '14px 18px',
          }}
        >
          <InfoRows rows={rows} />
        </Section>
      </Section>
    );
  }

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
      <InfoRows rows={rows} />
    </Section>
  );
}
