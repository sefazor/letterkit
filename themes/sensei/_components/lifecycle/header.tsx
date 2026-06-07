import { Img, Section, Text } from '@react-email/components';
import {
  LETTERKIT_LOGO_HEIGHT,
  LETTERKIT_LOGO_WIDTH,
  letterkitBrand,
} from '../../../_brand';
import type { EmailBrandProps } from '../email-brand';
import { withEmailBrandDefaults } from '../email-brand';
import { isPresent } from './present';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleHeader({ brand }: { brand: EmailBrandProps }) {
  const tokens = getActiveLifecycleTokens();
  const resolved = withEmailBrandDefaults(brand);
  const hasLogo = isPresent(resolved.logoUrl);
  const hasName = isPresent(resolved.appName);

  if (!hasLogo && !hasName) return null;

  return (
    <Section style={{ marginBottom: 40 }}>
      {hasLogo ? (
        <Img
          src={resolved.logoUrl}
          width={LETTERKIT_LOGO_WIDTH}
          height={LETTERKIT_LOGO_HEIGHT}
          alt={resolved.logoAlt ?? resolved.appName ?? letterkitBrand.logoAlt}
          style={{ display: 'block' }}
        />
      ) : (
        <Text
          style={{
            color: tokens.ink,
            fontFamily: tokens.fontFamily,
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            lineHeight: '22px',
            margin: 0,
          }}
        >
          {resolved.appName}
        </Text>
      )}
    </Section>
  );
}
