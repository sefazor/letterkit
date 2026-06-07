import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface PaymentMethodExpiringProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  cardLabel?: string;
  expiry?: string;
  actionUrl?: string;
}

export function PaymentMethodExpiring({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  cardLabel,
  expiry,
  actionUrl,
}: PaymentMethodExpiringProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="The card on file expires this month."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Payment method expiring soon</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — please update your card to prevent failed renewals.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Card', value: cardLabel ?? '' },
          { label: 'Expiry', value: expiry ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Update card" />
    </LifecycleLayout>
  );
}

export default PaymentMethodExpiring;
