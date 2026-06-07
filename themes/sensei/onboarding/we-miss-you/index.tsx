import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface WeMissYouProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function WeMissYou({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: WeMissYouProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your workspace can be reactivated in one click."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>We miss you</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your previous settings are still in place. Jump back in and continue where
        you left off.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Return to workspace" />
    </LifecycleLayout>
  );
}

export default WeMissYou;
