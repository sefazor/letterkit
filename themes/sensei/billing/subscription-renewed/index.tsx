import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface SubscriptionRenewedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  plan?: string;
  workspace?: string;
  nextInvoice?: string;
  actionUrl?: string;
}

export function SubscriptionRenewed({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  plan,
  workspace,
  nextInvoice,
  actionUrl,
}: SubscriptionRenewedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your monthly renewal completed successfully."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Subscription renewed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your subscription renewed and all features continue without interruption.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Plan', value: plan ?? '' },
          { label: 'Workspace', value: workspace ?? '' },
          { label: 'Next invoice', value: nextInvoice ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="View invoice" />
    </LifecycleLayout>
  );
}

export default SubscriptionRenewed;
