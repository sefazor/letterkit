import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface ReferralSignedUpProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function ReferralSignedUp({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: ReferralSignedUpProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A referred user created an account."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Your referral signed up</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your referral link brought a new signup. You are one step closer to
        referral rewards.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="View referral dashboard" />
    </LifecycleLayout>
  );
}

export default ReferralSignedUp;
