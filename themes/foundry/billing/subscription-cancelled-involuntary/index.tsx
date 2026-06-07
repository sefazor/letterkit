import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface SubscriptionCancelledInvoluntaryProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function SubscriptionCancelledInvoluntary({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: SubscriptionCancelledInvoluntaryProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="We could not collect payment after retries."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Subscription cancelled due to payment issues</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your plan was cancelled after unsuccessful payment attempts. Update billing
        to restore service.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Fix payment method" />
      <LifecycleFootnote>You have 7 days to recover full data access.</LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default SubscriptionCancelledInvoluntary;
