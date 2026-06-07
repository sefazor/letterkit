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
import { EmailLinkFallback } from '../../_components/link-fallback';

export interface MagicLinkProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  userName: string;
  magicLinkUrl: string;
  expiresIn: string;
  requestIp: string;
  requestLocation?: string;
}

/**
 * Magic link sign-in template for the Beacon theme.
 */
export function MagicLink({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  userName,
  magicLinkUrl,
  expiresIn,
  requestIp,
  requestLocation,
}: MagicLinkProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
     
      recipientEmail={recipientEmail}
      preview={`Your ${appName} sign-in link`}
    >
      <EmailEyebrow>Passwordless access</EmailEyebrow>
      <EmailHeading subtitle="No password needed — just one click">
        Sign in to {appName}
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, use the button below to sign in securely. This magic link is single-use and
        expires in {expiresIn}.
      </EmailBodyText>
      <EmailCtaSection
       
        href={magicLinkUrl}
        label="Sign in now"
        caption="Only click if you requested this email."
      />
      <EmailInfoCard
       
        title="Request details"
        rows={[
          { label: 'Expires', value: expiresIn },
          { label: 'IP address', value: requestIp },
          ...(requestLocation ? [{ label: 'Location', value: requestLocation }] : []),
        ]}
      />
      <EmailCallout title="Not you?">
        If you didn&apos;t try to sign in, ignore this email. Your account remains secure and this
        link will expire automatically.
      </EmailCallout>
      <EmailLinkFallback url={magicLinkUrl} label="Or paste this link" />
    </EmailLayout>
  );
}

export default MagicLink;
