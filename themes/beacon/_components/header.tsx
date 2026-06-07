import { Column, Img, Row, Section, Text } from '@react-email/components';
import { LETTERKIT_LOGO_HEIGHT, LETTERKIT_LOGO_WIDTH, letterkitBrand } from '../../_brand';
import type { EmailBrandProps } from './email-brand';
import { isPresent } from './present';
import { getActiveBeaconPalette } from './token-context';

export interface EmailForestHeaderProps {
  brand: EmailBrandProps;
  stampLabel?: string;
  stampValue?: string;
}

/**
 * Forest brand block — centered logo, optional stamp row (label left, value right).
 */
export function EmailForestHeader({ brand, stampLabel, stampValue }: EmailForestHeaderProps) {
  const palette = getActiveBeaconPalette();
  const hasLogo = isPresent(brand.logoUrl);
  const hasName = isPresent(brand.appName);
  const logoAlt = brand.logoAlt ?? brand.appName ?? letterkitBrand.logoAlt;
  const hasStamp = isPresent(stampLabel) && isPresent(stampValue);

  return (
    <Section
      style={{
        backgroundColor: palette.forest,
        padding: hasStamp ? '24px 36px 20px' : '26px 36px',
      }}
    >
      <Row>
        <Column align="center" style={{ textAlign: 'center' }}>
          {hasLogo ? (
            <Img
              src={brand.logoUrl}
              width={LETTERKIT_LOGO_WIDTH}
              height={LETTERKIT_LOGO_HEIGHT}
              alt={logoAlt}
              style={{ display: 'block', margin: '0 auto' }}
            />
          ) : hasName ? (
            <Text
              style={{
                margin: 0,
                fontFamily: palette.fontFamily,
                fontSize: 15,
                fontWeight: 500,
                color: palette.forestText,
                textAlign: 'center',
              }}
            >
              {brand.appName}
            </Text>
          ) : null}
        </Column>
      </Row>

      {hasStamp ? (
        <Row style={{ marginTop: 16 }}>
          <Column align="left" style={{ verticalAlign: 'middle', width: '50%' }}>
            <Text
              style={{
                fontFamily: palette.fontMono,
                fontSize: 10,
                color: palette.forestMuted,
                margin: 0,
                textAlign: 'left',
              }}
            >
              {stampLabel}
            </Text>
          </Column>
          <Column align="right" style={{ verticalAlign: 'middle', width: '50%' }}>
            <Text
              style={{
                fontFamily: palette.fontMono,
                fontSize: 12,
                color: palette.forestText,
                margin: 0,
                textAlign: 'right',
              }}
            >
              {stampValue}
            </Text>
          </Column>
        </Row>
      ) : null}
    </Section>
  );
}
