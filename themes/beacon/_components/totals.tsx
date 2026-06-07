import { Column, Row, Section, Text } from '@react-email/components';
import { getActiveBeaconPalette } from './token-context';

export interface TotalRow {
  label: string;
  value: string;
  emphasis?: boolean;
  muted?: boolean;
}

export interface EmailTotalsProps {
  rows?: TotalRow[];
  totalLabel?: string;
  totalValue?: string;
}

export function EmailTotals({ rows = [], totalLabel = 'Total charged', totalValue }: EmailTotalsProps) {
  const palette = getActiveBeaconPalette();

  if (totalValue) {
    const mutedRows = rows.filter((row) => !row.emphasis);
    return (
      <Section>
        {mutedRows.length > 0 ? (
          <Section
            style={{
              borderTop: `1px solid ${palette.border}`,
              marginTop: 10,
              paddingTop: 12,
            }}
          >
            {mutedRows.map((row) => (
              <Row key={row.label} style={{ padding: '5px 0' }}>
                <Column align="left" style={{ verticalAlign: 'middle', width: '50%' }}>
                  <Text style={{ fontSize: 13, color: palette.muted, margin: 0, textAlign: 'left' }}>
                    {row.label}
                  </Text>
                </Column>
                <Column align="right" style={{ verticalAlign: 'middle', width: '50%' }}>
                  <Text
                    style={{
                      fontFamily: palette.fontMono,
                      fontSize: 13,
                      color: palette.muted,
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
        ) : null}

        <Section
          style={{
            borderTop: `2px solid ${palette.forest}`,
            marginTop: 10,
            paddingTop: 16,
          }}
        >
          <Row>
            <Column align="left" style={{ verticalAlign: 'baseline', width: '50%' }}>
              <Text style={{ fontSize: 15, fontWeight: 500, color: palette.ink, margin: 0, textAlign: 'left' }}>
                {totalLabel}
              </Text>
            </Column>
            <Column align="right" style={{ verticalAlign: 'baseline', width: '50%' }}>
              <Text
                style={{
                  fontFamily: palette.fontMono,
                  fontSize: 22,
                  fontWeight: 500,
                  color: palette.forest,
                  margin: 0,
                  textAlign: 'right',
                }}
              >
                {totalValue}
              </Text>
            </Column>
          </Row>
        </Section>
      </Section>
    );
  }

  return (
    <Section style={{ marginTop: 10 }}>
      {rows.map((row) => (
        <Row
          key={row.label}
          style={{
            borderTop: row.emphasis ? `2px solid ${palette.forest}` : undefined,
            marginTop: row.emphasis ? 10 : 0,
            padding: '8px 0',
          }}
        >
          <Column align="left" style={{ width: '65%', verticalAlign: 'middle' }}>
            <Text
              style={{
                color: row.emphasis ? palette.ink : palette.muted,
                fontSize: row.emphasis ? 15 : 13,
                fontWeight: row.emphasis ? 500 : 400,
                margin: 0,
                textAlign: 'left',
              }}
            >
              {row.label}
            </Text>
          </Column>
          <Column align="right" style={{ width: '35%', verticalAlign: 'middle' }}>
            <Text
              style={{
                color: row.emphasis ? palette.forest : palette.muted,
                fontFamily: palette.fontMono,
                fontSize: row.emphasis ? 22 : 13,
                fontWeight: row.emphasis ? 500 : 400,
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
