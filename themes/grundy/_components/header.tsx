import { Hr, Img, Section, Text } from '@react-email/components';
import { LETTERKIT_LOGO_HEIGHT, LETTERKIT_LOGO_WIDTH, letterkitBrand } from '../../_brand';
import type { EmailBrandProps } from './email-brand';
import { isPresent } from './present';
import { getActiveGrundyTokens } from './token-context';

export interface EmailHeaderProps {
  brand: EmailBrandProps;
  tagline?: string;
}

/**
 * Typography-driven header with centered logo or app name fallback.
 */
export function EmailHeader({ brand, tagline }: EmailHeaderProps) {
  const t = getActiveGrundyTokens();
  const hasLogo = isPresent(brand.logoUrl);
  const hasName = isPresent(brand.appName);
  const resolvedLogoAlt = brand.logoAlt ?? brand.appName ?? letterkitBrand.logoAlt;

  return (
    <Section style={{ padding: `${t.spacing.xl} 0 ${t.spacing.lg}` }}>
      <Section style={{ textAlign: 'center' }}>
        {hasLogo ? (
          <Img
            src={brand.logoUrl}
            alt={resolvedLogoAlt}
            width={LETTERKIT_LOGO_WIDTH}
            height={LETTERKIT_LOGO_HEIGHT}
            style={{ display: 'block', margin: '0 auto' }}
          />
        ) : hasName ? (
          <Text
            className="email-fg"
            style={{
              color: t.colors.foreground,
              fontFamily: t.fontFamily.heading,
              fontSize: t.fontSize.xl,
              fontWeight: 600,
              margin: 0,
            }}
          >
            {brand.appName}
          </Text>
        ) : null}
        {tagline ? (
          <Text
            className="email-muted"
            style={{
              color: t.colors.mutedForeground,
              fontSize: t.fontSize.xs,
              margin: `${t.spacing.sm} 0 0`,
            }}
          >
            {tagline}
          </Text>
        ) : null}
      </Section>
      <Section style={{ marginTop: t.spacing.lg }}>
        <Hr
          style={{
            border: 'none',
            borderTop: `1px solid ${t.colors.border}`,
            margin: 0,
          }}
        />
        <Section
          style={{
            lineHeight: 0,
            margin: '0 auto',
            textAlign: 'center',
            width: '8px',
          }}
        >
          <Text
            style={{
              backgroundColor: t.colors.primary,
              borderRadius: 0,
              display: 'inline-block',
              fontSize: '1px',
              height: '8px',
              lineHeight: '8px',
              margin: '-4px auto 0',
              width: '8px',
            }}
          >
            &nbsp;
          </Text>
        </Section>
      </Section>
    </Section>
  );
}
