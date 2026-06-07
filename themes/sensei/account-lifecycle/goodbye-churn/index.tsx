import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { senseiBrand } from '../../brand.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';

export interface GoodbyeChurnProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail: string;
  feedbackUrl: string;
}

export function GoodbyeChurn({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  feedbackUrl,
}: GoodbyeChurnProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Thanks for trying us — we'd love your feedback"
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Thanks for trying {brand.appName}</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your subscription has ended. We&apos;re grateful you gave{' '}
        <LifecycleStrong>{brand.appName}</LifecycleStrong> a try — a
        quick note on what we could do better means a lot.
      </LifecycleLede>
      <LifecycleCta href={feedbackUrl} label="Share feedback" />
    </LifecycleLayout>
  );
}

export default GoodbyeChurn;
