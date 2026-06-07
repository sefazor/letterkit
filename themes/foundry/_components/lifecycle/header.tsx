import { Column, Img, Row, Section, Text } from '@react-email/components';
import type { EmailBrandProps } from '../email-brand';
import {
  FOUNDRY_LOGO_HEIGHT,
  FOUNDRY_LOGO_WIDTH,
  resolveFoundryLogoAlt,
  resolveFoundryLogoUrl,
} from '../email-brand';
import { FONT_DISPLAY, FONT_MONO } from './fonts';
import { isPresent } from './present';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleHeader({
  brand,
  eyebrow,
}: {
  brand: EmailBrandProps;
  eyebrow?: string;
}) {
  const tokens = getActiveLifecycleTokens();
  const hasLogo = isPresent(brand.logoUrl);
  const hasName = isPresent(brand.appName);
  if (!isPresent(eyebrow) && !hasLogo && !hasName) return null;

  return (
    <Section style={{ marginBottom: 56 }}>
      <Row>
        <Column style={{ verticalAlign: 'middle' }}>
          {hasLogo ? (
            <Img
              src={resolveFoundryLogoUrl(brand.logoUrl)}
              width={String(FOUNDRY_LOGO_WIDTH)}
              height={String(FOUNDRY_LOGO_HEIGHT)}
              alt={resolveFoundryLogoAlt(brand.logoAlt, brand.appName)}
              style={{ display: 'block', borderRadius: 1 }}
            />
          ) : hasName ? (
            <Text
              style={{
                color: tokens.body,
                fontFamily: FONT_DISPLAY,
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: `${FOUNDRY_LOGO_HEIGHT}px`,
                margin: 0,
              }}
            >
              {brand.appName}
            </Text>
          ) : null}
        </Column>
        {isPresent(eyebrow) ? (
          <Column align="right" style={{ verticalAlign: 'middle' }}>
            <Text
              style={{
                fontFamily: FONT_MONO,
                fontSize: 11,
                letterSpacing: '0.06em',
                color: tokens.muted,
                margin: 0,
              }}
            >
              {eyebrow}
            </Text>
          </Column>
        ) : null}
      </Row>
    </Section>
  );
}
