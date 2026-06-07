import { Img, Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';
import { foundryTokens } from '../tokens.config';
import { LETTERKIT_LOGO_HEIGHT, LETTERKIT_LOGO_WIDTH } from '../../_brand';
import { resolveFoundryLogoAlt, resolveFoundryLogoUrl } from './email-brand';

export interface EmailHeaderProps {
  tokens: ThemeTokens;
  appName: string;
  logoUrl?: string;
  logoAlt?: string;
}

export function EmailHeader({ tokens, appName, logoUrl, logoAlt }: EmailHeaderProps) {
  const t = tokens;
  const hasLogo = Boolean(logoUrl);
  const resolvedLogoAlt = resolveFoundryLogoAlt(logoAlt, appName);

  return (
    <Section style={{ padding: `0 0 ${t.spacing.xl}`, textAlign: 'left' }}>
      {hasLogo ? (
        <Img
          src={resolveFoundryLogoUrl(logoUrl)}
          alt={resolvedLogoAlt}
          width={LETTERKIT_LOGO_WIDTH}
          height={LETTERKIT_LOGO_HEIGHT}
          style={{ display: 'block' }}
        />
      ) : (
        <Text
          style={{
            color: foundryTokens.body,
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
