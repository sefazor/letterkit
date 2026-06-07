import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface ReferralConvertedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  rewardEarned?: string;
  actionUrl?: string;
}

export function ReferralConverted({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  rewardEarned,
  actionUrl,
}: ReferralConvertedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="You earned referral credit from a paid conversion."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Referral converted to paid</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — one referred account upgraded to paid. Reward credits are now added to your
        wallet.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Reward earned', value: rewardEarned ?? '' }]} />
      <LifecycleCta href={actionUrl} label="See earned rewards" />
    </LifecycleLayout>
  );
}

export default ReferralConverted;
