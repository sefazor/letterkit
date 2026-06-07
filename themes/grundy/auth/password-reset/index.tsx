import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';
import { EmailLinkFallback } from '../../_components/link-fallback';

export interface PasswordResetProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  resetUrl: string;
  expiresIn: string;
  requestIp?: string;
  requestLocation?: string;
  requestedAt?: string;
}

/**
 * Password reset template for the Grundy theme.
 */
export function PasswordReset({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  userName,
  resetUrl,
  expiresIn,
  requestIp,
  requestLocation,
  requestedAt,
}: PasswordResetProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Reset your ${appName} password`}
      headerTagline="Account security"
    >
      <EmailEyebrow>Authentication</EmailEyebrow>
      <EmailHeading subtitle="This link expires soon">
        Reset your password
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, we received a request to reset the password for your {appName} account. Click
        below to choose a new one. The link expires in {expiresIn}.
      </EmailBodyText>
      <EmailCtaSection
        href={resetUrl}
        label="Reset password"
        caption="You'll be asked to enter a new password on the next page."
      />
      {requestIp || requestLocation || requestedAt ? (
        <EmailInfoCard
          title="Request details"
          rows={[
            ...(requestedAt ? [{ label: 'Requested', value: requestedAt }] : []),
            ...(requestIp ? [{ label: 'IP address', value: requestIp }] : []),
            ...(requestLocation ? [{ label: 'Location', value: requestLocation }] : []),
          ]}
        />
      ) : null}
      <EmailCallout title="Wasn't you?">
        If you didn&apos;t request a password reset, ignore this email. Your password won&apos;t change
        unless you use the link above.
      </EmailCallout>
      <EmailLinkFallback url={resetUrl} />
    </EmailLayout>
  );
}

export default PasswordReset;
