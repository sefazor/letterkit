import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface InactiveDay14Props {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function InactiveDay14({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: InactiveDay14Props) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Two weeks in — here is a focused restart plan."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Let us help you relaunch</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — book a 15-minute setup call and we&apos;ll configure your workspace around
        your current process.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Book onboarding call" />
    </LifecycleLayout>
  );
}

export default InactiveDay14;
