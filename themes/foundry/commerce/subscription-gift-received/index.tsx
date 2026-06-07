import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { foundryBrand } from '../../brand.config';

export interface SubscriptionGiftReceivedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  giftPlan?: string;
  actionUrl?: string;
}

export function SubscriptionGiftReceived({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  giftPlan,
  actionUrl,
}: SubscriptionGiftReceivedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A gift plan is waiting for activation."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>You received a gift subscription</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — good news: you received{' '}
        {giftPlan ? (
          <LifecycleStrong>{giftPlan}</LifecycleStrong>
        ) : (
          'a gift subscription'
        )}
        .
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Redeem gift" />
    </LifecycleLayout>
  );
}

export default SubscriptionGiftReceived;
