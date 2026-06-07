import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface SubscriptionStartedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  plan?: string;
  workspace?: string;
  nextInvoice?: string;
  actionUrl?: string;
}

export function SubscriptionStarted({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  plan,
  workspace,
  nextInvoice,
  actionUrl,
}: SubscriptionStartedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your subscription is active and billing is set."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Subscription started</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your subscription is now active. Thank you for choosing {brand.appName} for
        your team.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Plan', value: plan ?? '' },
          { label: 'Workspace', value: workspace ?? '' },
          { label: 'Next invoice', value: nextInvoice ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="See plan details" />
    </LifecycleLayout>
  );
}

export default SubscriptionStarted;
