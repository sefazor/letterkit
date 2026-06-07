import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface UpcomingRenewalNoticeProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  renewalAmount?: string;
  actionUrl?: string;
}

export function UpcomingRenewalNotice({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  renewalAmount,
  actionUrl,
}: UpcomingRenewalNoticeProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your plan renews in 5 days."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Upcoming renewal notice</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your subscription will renew soon. No action is needed if your billing
        details are current.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Renewal amount', value: renewalAmount ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Review billing details" />
    </LifecycleLayout>
  );
}

export default UpcomingRenewalNotice;
