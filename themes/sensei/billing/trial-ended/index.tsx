import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface TrialEndedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function TrialEnded({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: TrialEndedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your trial has finished. Upgrade to continue."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Trial ended</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your trial period is over and some premium features are now paused.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Upgrade now" />
      <LifecycleFootnote>Data remains safe for 30 days on read-only access.</LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default TrialEnded;
