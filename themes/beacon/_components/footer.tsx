import { Link, Section, Text } from '@react-email/components';
import type { EmailBrandProps } from './email-brand';
import { isPresent } from './present';
import { getActiveBeaconPalette, getActiveBeaconTokens } from './token-context';

export interface EmailFooterProps {
  brand: EmailBrandProps;
  recipientEmail?: string;
}

/**
 * Minimal in-card footer — single preference line + address.
 */
export function EmailFooter({ brand, recipientEmail }: EmailFooterProps) {
  const palette = getActiveBeaconPalette();
  const tokens = getActiveBeaconTokens();
  const preferencesUrl = brand.preferencesUrl ?? brand.unsubscribeUrl;
  const addressLine = [brand.legalName, brand.companyAddress].filter(isPresent).join(' · ');

  return (
    <Section
      style={{
        borderTop: `1px solid ${palette.border}`,
        backgroundColor: palette.surface,
        padding: '22px 36px',
        textAlign: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: tokens.fontFamily.body,
          fontSize: 12,
          color: palette.mutedSoft,
          lineHeight: 1.5,
          margin: '0 0 4px',
        }}
      >
        {isPresent(recipientEmail) ? (
          <>
            Sent to <span style={{ color: palette.body }}>{recipientEmail}</span>
          </>
        ) : null}
        {isPresent(recipientEmail) && isPresent(preferencesUrl) ? ' · ' : null}
        {isPresent(preferencesUrl) ? (
          <Link href={preferencesUrl} style={{ color: palette.body, textDecoration: 'none' }}>
            Preferences
          </Link>
        ) : null}
        {isPresent(brand.termsUrl) ? (
          <>
            {' · '}
            <Link href={brand.termsUrl} style={{ color: palette.body, textDecoration: 'none' }}>
              Terms
            </Link>
          </>
        ) : null}
        {isPresent(brand.privacyUrl) ? (
          <>
            {' · '}
            <Link href={brand.privacyUrl} style={{ color: palette.body, textDecoration: 'none' }}>
              Privacy
            </Link>
          </>
        ) : null}
      </Text>
      {isPresent(addressLine) ? (
        <Text
          style={{
            fontFamily: tokens.fontFamily.body,
            fontSize: 11,
            color: palette.mutedSoft,
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {addressLine}
        </Text>
      ) : null}
    </Section>
  );
}
