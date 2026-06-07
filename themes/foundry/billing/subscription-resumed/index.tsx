import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface SubscriptionResumedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function SubscriptionResumed({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: SubscriptionResumedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your plan is active again."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Subscription resumed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — welcome back. Billing resumed and premium capabilities are restored.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Open billing" />
    </LifecycleLayout>
  );
}

export default SubscriptionResumed;
