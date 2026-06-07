import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface TrialStartedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  trialLength?: string;
  planAfterTrial?: string;
  workspace?: string;
  actionUrl?: string;
}

export function TrialStarted({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  trialLength,
  planAfterTrial,
  workspace,
  actionUrl,
}: TrialStartedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="You now have full Pro-level access for 14 days."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Your trial has started</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your trial is active. Explore automation, analytics, and team permissions
        with no limits.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Trial length', value: trialLength ?? '' },
          { label: 'Plan after trial', value: planAfterTrial ?? '' },
          { label: 'Workspace', value: workspace ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Explore Pro features" />
    </LifecycleLayout>
  );
}

export default TrialStarted;
