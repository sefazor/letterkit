import { Hr, Link, Section, Text } from '@react-email/components';
import type { EmailBrandProps } from './email-brand';
import { isPresent } from './present';
import { getActiveGrundyTokens } from './token-context';

export interface EmailFooterProps {
  brand: EmailBrandProps;
  recipientEmail?: string;
  helpEmail?: string;
}

/**
 * Multi-line footer with help contact, legal links, address, and unsubscribe.
 */
export function EmailFooter({ brand, recipientEmail, helpEmail }: EmailFooterProps) {
  const t = getActiveGrundyTokens();
  const year = brand.copyrightYear ?? new Date().getFullYear();
  const link = { color: t.colors.mutedForeground, textDecoration: 'underline' as const };
  const resolvedHelpEmail = helpEmail ?? (isPresent(brand.supportUrl) && brand.supportUrl.includes('@') ? brand.supportUrl : undefined);
  const addressLine = [brand.legalName, brand.companyAddress].filter(isPresent).join(' · ');

  const footerLinks = [
    isPresent(brand.termsUrl) ? { label: 'Terms', href: brand.termsUrl } : null,
    isPresent(brand.privacyUrl) ? { label: 'Privacy', href: brand.privacyUrl } : null,
    isPresent(brand.unsubscribeUrl) ? { label: 'Unsubscribe', href: brand.unsubscribeUrl } : null,
  ].filter((item): item is { label: string; href: string } => item !== null);

  return (
    <Section style={{ marginTop: t.spacing.xl, paddingBottom: t.spacing.lg }}>
      <Hr
        className="email-border"
        style={{
          borderColor: t.colors.border,
          margin: `0 0 ${t.spacing.lg}`,
        }}
      />
      {resolvedHelpEmail ? (
        <Text
          className="email-muted"
          style={{
            color: t.colors.mutedForeground,
            fontSize: t.fontSize.sm,
            lineHeight: '22px',
            margin: `0 0 ${t.spacing.sm}`,
            textAlign: 'center',
          }}
        >
          Questions?{' '}
          <Link href={`mailto:${resolvedHelpEmail}`} style={{ color: t.colors.foreground, textDecoration: 'underline' }}>
            {resolvedHelpEmail}
          </Link>
        </Text>
      ) : null}
      {isPresent(recipientEmail) ? (
        <Text
          className="email-muted"
          style={{
            color: t.colors.mutedForeground,
            fontSize: t.fontSize.xs,
            lineHeight: '18px',
            margin: `0 0 ${t.spacing.sm}`,
            textAlign: 'center',
          }}
        >
          Sent to <span style={{ color: t.colors.foreground }}>{recipientEmail}</span>
        </Text>
      ) : null}
      {isPresent(addressLine) ? (
        <Text
          className="email-muted"
          style={{
            color: t.colors.mutedForeground,
            fontSize: t.fontSize.xs,
            lineHeight: '18px',
            margin: `0 0 ${t.spacing.sm}`,
            textAlign: 'center',
          }}
        >
          {addressLine}
        </Text>
      ) : null}
      <Text
        className="email-muted"
        style={{
          color: t.colors.mutedForeground,
          fontSize: t.fontSize.xs,
          margin: 0,
          textAlign: 'center',
        }}
      >
        © {year} {brand.legalName ?? brand.appName}
        {footerLinks.map((item, i) => (
          <span key={item.label}>
            {' · '}
            <Link href={item.href} style={link}>
              {item.label}
            </Link>
          </span>
        ))}
      </Text>
    </Section>
  );
}
