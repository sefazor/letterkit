import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface PaymentMethodUpdatedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function PaymentMethodUpdated({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: PaymentMethodUpdatedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your new billing card is now active."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Payment method updated</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — billing method was updated successfully and future charges will use this
        card.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Review billing settings" />
    </LifecycleLayout>
  );
}

export default PaymentMethodUpdated;
