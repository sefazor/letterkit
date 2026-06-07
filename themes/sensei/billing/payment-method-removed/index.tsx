import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface PaymentMethodRemovedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function PaymentMethodRemoved({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: PaymentMethodRemovedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A billing method was removed from your account."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Payment method removed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — the card on file was removed. Add another method to keep renewals
        uninterrupted.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Add payment method" />
    </LifecycleLayout>
  );
}

export default PaymentMethodRemoved;
