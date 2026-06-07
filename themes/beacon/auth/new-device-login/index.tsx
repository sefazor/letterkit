import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface NewDeviceLoginProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  userName: string;
  activityUrl: string;
  device: string;
  ipAddress: string;
  location?: string;
  loggedInAt: string;
}

/**
 * New device login alert template for the Beacon theme.
 */
export function NewDeviceLogin({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  userName,
  activityUrl,
  device,
  ipAddress,
  location,
  loggedInAt,
}: NewDeviceLoginProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`New sign-in to your ${appName} account`}
    >
      <EmailEyebrow>Security alert</EmailEyebrow>
      <EmailHeading subtitle="We noticed a sign-in from a new device">
        New device sign-in
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, your {appName} account was just accessed from a device we haven&apos;t seen
        before. If this was you, you can safely ignore this email.
      </EmailBodyText>
      <EmailInfoCard
        title="Sign-in details"
        rows={[
          { label: 'Device', value: device },
          { label: 'IP address', value: ipAddress },
          ...(location ? [{ label: 'Location', value: location }] : []),
          { label: 'When', value: loggedInAt },
        ]}
      />
      <EmailCallout title="Not you?">
        If you don&apos;t recognize this activity, secure your account immediately. Review active
        sessions and change your password.
      </EmailCallout>
      <EmailCtaSection
        href={activityUrl}
        label="Review all sessions"
        caption="See every device signed in to your account."
      />
    </EmailLayout>
  );
}

export default NewDeviceLogin;
