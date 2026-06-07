import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface SubscriptionDowngradedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function SubscriptionDowngraded({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: SubscriptionDowngradedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your plan change is scheduled and confirmed."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Plan downgraded</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your downgrade is accepted and will apply on the next billing cycle.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Check impact" />
      <LifecycleFootnote>Feature limits may change when the new cycle begins.</LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default SubscriptionDowngraded;
