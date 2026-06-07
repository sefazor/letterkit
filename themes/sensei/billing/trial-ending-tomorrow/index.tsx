import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface TrialEndingTomorrowProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  endsIn?: string;
  actionUrl?: string;
}

export function TrialEndingTomorrow({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  endsIn,
  actionUrl,
}: TrialEndingTomorrowProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Final reminder before your trial expires."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Trial ends tomorrow</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your trial ends tomorrow at 23:59. Add billing now for uninterrupted
        access.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Ends in', value: endsIn ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Confirm billing" />
    </LifecycleLayout>
  );
}

export default TrialEndingTomorrow;
