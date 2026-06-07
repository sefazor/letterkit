import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface TrialEnding7DaysProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  daysRemaining?: string;
  planAfterTrial?: string;
  workspace?: string;
  actionUrl?: string;
}

export function TrialEnding7Days({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  daysRemaining,
  planAfterTrial,
  workspace,
  actionUrl,
}: TrialEnding7DaysProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Plan your next step to keep your workspace running smoothly."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>7 days left in your trial</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your trial ends in one week. Add a payment method now to avoid
        interruption.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Days remaining', value: daysRemaining ?? '' },
          { label: 'Plan after trial', value: planAfterTrial ?? '' },
          { label: 'Workspace', value: workspace ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Add payment method" />
    </LifecycleLayout>
  );
}

export default TrialEnding7Days;
