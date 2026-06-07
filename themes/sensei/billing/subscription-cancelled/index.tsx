import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface SubscriptionCancelledProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  accessUntil?: string;
  actionUrl?: string;
}

export function SubscriptionCancelled({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  accessUntil,
  actionUrl,
}: SubscriptionCancelledProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your subscription will not renew."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Subscription cancelled</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — cancellation is confirmed. You can continue using paid features until the
        current period ends.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Access until', value: accessUntil ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Reactivate plan" />
    </LifecycleLayout>
  );
}

export default SubscriptionCancelled;
