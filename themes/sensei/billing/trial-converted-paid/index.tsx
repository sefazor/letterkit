import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface TrialConvertedPaidProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  newPlan?: string;
  actionUrl?: string;
}

export function TrialConvertedPaid({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  newPlan,
  actionUrl,
}: TrialConvertedPaidProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your trial is now converted to a paid subscription."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Welcome to your paid plan</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — great news: your account converted successfully and premium features stay
        fully active.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'New plan', value: newPlan ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Open billing overview" />
    </LifecycleLayout>
  );
}

export default TrialConvertedPaid;
