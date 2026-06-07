import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface LicenseKeyDeliveredProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  licenseKey?: string;
  actionUrl?: string;
}

export function LicenseKeyDelivered({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  licenseKey,
  actionUrl,
}: LicenseKeyDeliveredProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your license key is ready."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Your license key is ready</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your purchased license key is now available in your account portal.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'License', value: licenseKey ?? '' }]} />
      <LifecycleCta href={actionUrl} label="View license key" />
    </LifecycleLayout>
  );
}

export default LicenseKeyDelivered;
