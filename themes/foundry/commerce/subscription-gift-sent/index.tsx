import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface SubscriptionGiftSentProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function SubscriptionGiftSent({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: SubscriptionGiftSentProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your gift subscription was emailed successfully."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Gift subscription sent</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your gift has been sent with redemption instructions to the recipient.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="View gift status" />
    </LifecycleLayout>
  );
}

export default SubscriptionGiftSent;
