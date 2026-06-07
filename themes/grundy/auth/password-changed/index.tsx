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

export interface PasswordChangedProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  securityUrl: string;
  changeSource?: string;
  ipAddress?: string;
  location?: string;
  changedAt?: string;
}

/**
 * Password changed confirmation template for the Grundy theme.
 */
export function PasswordChanged({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  userName,
  securityUrl,
  changeSource = 'Account settings',
  ipAddress,
  location,
  changedAt,
}: PasswordChangedProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Your ${appName} password was changed`}
      headerTagline="Account security"
    >
      <EmailEyebrow>Security update</EmailEyebrow>
      <EmailHeading subtitle="Your account password was updated">
        Password changed
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, the password for your {appName} account was changed successfully. If you made
        this change, no further action is needed.
      </EmailBodyText>
      <EmailInfoCard
        title="Change details"
        rows={[
          { label: 'Source', value: changeSource },
          ...(changedAt ? [{ label: 'When', value: changedAt }] : []),
          ...(ipAddress ? [{ label: 'IP address', value: ipAddress }] : []),
          ...(location ? [{ label: 'Location', value: location }] : []),
        ]}
      />
      <EmailCallout title="Didn't change your password?">
        Someone may have access to your account. Secure it immediately and review active sessions.
      </EmailCallout>
      <EmailCtaSection
        href={securityUrl}
        label="Review security settings"
        caption="Update your password and sign out other devices."
      />
    </EmailLayout>
  );
}

export default PasswordChanged;
