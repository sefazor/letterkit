import { Hr, Link, Text } from '@react-email/components';
import type { EmailBrandProps } from '../email-brand';
import { FONT_MONO } from './fonts';
import { isPresent } from './present';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleFooter({
  brand,
  recipientEmail,
  readOnWebUrl,
}: {
  brand: EmailBrandProps;
  recipientEmail?: string;
  readOnWebUrl?: string;
}) {
  const tokens = getActiveLifecycleTokens();
  const link = { color: tokens.body, textDecoration: 'none' as const };

  const footerLinks = [
    isPresent(readOnWebUrl) ? { label: 'read on web', href: readOnWebUrl } : null,
    isPresent(brand.unsubscribeUrl)
      ? { label: 'unsubscribe', href: brand.unsubscribeUrl }
      : null,
    isPresent(brand.termsUrl) ? { label: 'terms', href: brand.termsUrl } : null,
    isPresent(brand.privacyUrl) ? { label: 'privacy', href: brand.privacyUrl } : null,
  ].filter((item): item is { label: string; href: string } => item !== null);

  const companyParts = [brand.legalName, brand.companyAddress].filter(isPresent);
  const hasRecipient = isPresent(recipientEmail);
  const hasAppName = isPresent(brand.appName);
  const hasLinkLine = hasAppName || footerLinks.length > 0;
  const hasCompanyLine = companyParts.length > 0;

  if (!hasLinkLine && !hasRecipient && !hasCompanyLine) return null;

  return (
    <>
      <Hr
        style={{
          borderTop: `1px solid ${tokens.border}`,
          borderBottom: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          margin: '0 0 24px',
        }}
      />
      <Text
        style={{
          fontFamily: FONT_MONO,
          fontSize: 11,
          letterSpacing: '0.06em',
          color: tokens.muted,
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {hasLinkLine ? (
          <>
            {hasAppName ? brand.appName : null}
            {footerLinks.map((item, i) => (
              <span key={item.label}>
                {hasAppName || i > 0 ? ' · ' : null}
                <Link href={item.href} style={link}>
                  {item.label}
                </Link>
              </span>
            ))}
          </>
        ) : null}
        {hasRecipient ? (
          <>
            {hasLinkLine ? <br /> : null}
            sent to <span style={{ color: tokens.body }}>{recipientEmail}</span>
          </>
        ) : null}
        {hasCompanyLine ? (
          <>
            {hasLinkLine || hasRecipient ? <br /> : null}
            {companyParts.join(' · ')}
          </>
        ) : null}
      </Text>
    </>
  );
}
