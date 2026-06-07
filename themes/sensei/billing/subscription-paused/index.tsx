import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface SubscriptionPausedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  pauseUntil?: string;
  actionUrl?: string;
}

export function SubscriptionPaused({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  pauseUntil,
  actionUrl,
}: SubscriptionPausedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your billing is paused temporarily."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Subscription paused</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — the subscription is paused and renewals are on hold until you resume.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Pause window', value: pauseUntil ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Resume subscription" />
    </LifecycleLayout>
  );
}

export default SubscriptionPaused;
