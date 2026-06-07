import { Hr, Link, Text } from '@react-email/components';
import type { EmailBrandProps } from '../email-brand';
import { isPresent } from './present';
import { getActiveLifecycleTokens } from './token-context';

export function LifecycleFooter({
  brand,
  recipientEmail,
}: {
  brand: EmailBrandProps;
  recipientEmail?: string;
}) {
  const tokens = getActiveLifecycleTokens();
  const link = { color: tokens.body, textDecoration: 'none' as const };

  const footerLinks = [
    isPresent(brand.unsubscribeUrl)
      ? { label: 'Email preferences', href: brand.unsubscribeUrl }
      : null,
    isPresent(brand.termsUrl) ? { label: 'Terms', href: brand.termsUrl } : null,
    isPresent(brand.privacyUrl) ? { label: 'Privacy', href: brand.privacyUrl } : null,
  ].filter((item): item is { label: string; href: string } => item !== null);

  const companyParts = [brand.legalName, brand.companyAddress].filter(isPresent);
  const hasRecipient = isPresent(recipientEmail);
  const hasMetaLine = hasRecipient || footerLinks.length > 0;
  const hasCompanyLine = companyParts.length > 0;

  if (!hasMetaLine && !hasCompanyLine) return null;

  return (
    <>
      <Hr style={{ borderColor: tokens.border, margin: '0 0 24px' }} />
      {hasMetaLine ? (
        <Text
          style={{
            color: tokens.mutedSoft,
            fontFamily: tokens.fontFamily,
            fontSize: 12,
            lineHeight: 1.6,
            margin: hasCompanyLine ? '0 0 8px' : 0,
          }}
        >
          {hasRecipient ? (
            <>
              Sent to <span style={{ color: tokens.body }}>{recipientEmail}</span>
            </>
          ) : null}
          {footerLinks.map((item, i) => (
            <span key={item.label}>
              {hasRecipient || i > 0 ? ' · ' : null}
              <Link href={item.href} style={link}>
                {item.label}
              </Link>
            </span>
          ))}
        </Text>
      ) : null}
      {hasCompanyLine ? (
        <Text
          style={{
            color: tokens.mutedSoft,
            fontFamily: tokens.fontFamily,
            fontSize: 12,
            margin: 0,
          }}
        >
          {companyParts.join(' · ')}
        </Text>
      ) : null}
    </>
  );
}
