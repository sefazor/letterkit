import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface TrialEnding3DaysProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  daysRemaining?: string;
  actionUrl?: string;
}

export function TrialEnding3Days({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  daysRemaining,
  actionUrl,
}: TrialEnding3DaysProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Reminder: your paid plan starts soon."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>3 days left in trial</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — only three days remain. Keep your automations active by confirming billing
        today.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Days remaining', value: daysRemaining ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Choose a paid plan" />
    </LifecycleLayout>
  );
}

export default TrialEnding3Days;
