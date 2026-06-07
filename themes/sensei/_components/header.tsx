import { Img, Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';
import {
  LETTERKIT_LOGO_HEIGHT,
  LETTERKIT_LOGO_WIDTH,
  letterkitBrand,
  resolveLetterkitLogoUrl,
} from '../../_brand';

export interface EmailHeaderProps {
  tokens: ThemeTokens;
  appName: string;
  logoUrl?: string;
  logoAlt?: string;
}

export function EmailHeader({ tokens, appName, logoUrl, logoAlt }: EmailHeaderProps) {
  const t = tokens;
  const resolvedLogoUrl = resolveLetterkitLogoUrl(logoUrl);
  const resolvedLogoAlt = logoAlt ?? letterkitBrand.logoAlt;

  return (
    <Section style={{ padding: `0 0 ${t.spacing.xl}`, textAlign: 'left' }}>
      {resolvedLogoUrl ? (
        <Img
          src={resolvedLogoUrl}
          alt={resolvedLogoAlt}
          width={LETTERKIT_LOGO_WIDTH}
          height={LETTERKIT_LOGO_HEIGHT}
          style={{ display: 'block' }}
        />
      ) : (
        <Text
          style={{
            color: t.colors.foreground,
            fontFamily: t.fontFamily.heading,
            fontSize: t.fontSize.xl,
            fontWeight: 700,
            letterSpacing: '0.04em',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          {appName}
        </Text>
      )}
    </Section>
  );
}
