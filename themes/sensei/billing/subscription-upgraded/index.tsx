import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { senseiBrand } from '../../brand.config';

export interface SubscriptionUpgradedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  newTier?: string;
  actionUrl?: string;
}

export function SubscriptionUpgraded({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  newTier,
  actionUrl,
}: SubscriptionUpgradedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your team moved to a higher plan."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Plan upgraded</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your plan upgrade is complete
        {newTier ? (
          <>
            {' '}
            to{' '}
            <LifecycleStrong>{newTier}</LifecycleStrong>
          </>
        ) : null}
        . Additional seats plus advanced analytics are now enabled.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'New tier', value: newTier ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Review new limits" />
    </LifecycleLayout>
  );
}

export default SubscriptionUpgraded;
