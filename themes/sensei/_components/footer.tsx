import { Hr, Link, Section, Text } from '@react-email/components';
import type { ThemeTokens } from '@letterkit/theme';

export interface EmailFooterProps {
  tokens: ThemeTokens;
  appName: string;
  /** e.g. acme.com */
  websiteUrl?: string;
  unsubscribeUrl?: string;
  termsUrl?: string;
  privacyUrl?: string;
  /** Legal entity for copyright line */
  legalName?: string;
  copyrightYear?: number;
}

/**
 * PAYTORE-style footer — divider, linked disclaimer, copyright.
 */
export function EmailFooter({
  tokens,
  appName,
  websiteUrl,
  unsubscribeUrl,
  termsUrl,
  privacyUrl,
  legalName,
  copyrightYear,
}: EmailFooterProps) {
  const t = tokens;
  const year = copyrightYear ?? new Date().getFullYear();
  const link = { color: t.colors.primary, textDecoration: 'none' as const };
  const site = websiteUrl ?? 'acme.com';
  const entity = legalName ?? appName;

  return (
    <Section style={{ marginTop: '40px', textAlign: 'left' }}>
      <Hr
        style={{
          border: 'none',
          borderTop: `1px solid ${t.colors.border}`,
          margin: '0 0 24px',
        }}
      />
      <Text
        style={{
          color: '#9CA3AF',
          fontFamily: t.fontFamily.body,
          fontSize: t.fontSize.xs,
          lineHeight: '20px',
          margin: '0 0 16px',
          textAlign: 'left',
        }}
      >
        This email was sent to you as a registered member of{' '}
        <Link href={`https://${site.replace(/^https?:\/\//, '')}`} style={link}>
          {site.replace(/^https?:\/\//, '')}
        </Link>
        .{' '}
        {unsubscribeUrl ? (
          <>
            To update your email preferences,{' '}
            <Link href={unsubscribeUrl} style={link}>
              click here
            </Link>
            .{' '}
          </>
        ) : null}
        Use of the service and website is subject to our{' '}
        {termsUrl ? (
          <Link href={termsUrl} style={link}>
            Terms of Service
          </Link>
        ) : (
          'Terms of Service'
        )}{' '}
        and{' '}
        {privacyUrl ? (
          <Link href={privacyUrl} style={link}>
            Privacy Policy
          </Link>
        ) : (
          'Privacy Policy'
        )}
        .
      </Text>
      <Text
        style={{
          color: '#9CA3AF',
          fontFamily: t.fontFamily.body,
          fontSize: t.fontSize.xs,
          lineHeight: '18px',
          margin: 0,
          textAlign: 'left',
        }}
      >
        © {year} {entity}. All rights reserved.
      </Text>
    </Section>
  );
}
