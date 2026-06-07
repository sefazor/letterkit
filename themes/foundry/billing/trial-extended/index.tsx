import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface TrialExtendedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  extension?: string;
  actionUrl?: string;
}

export function TrialExtended({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  extension,
  actionUrl,
}: TrialExtendedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="You have extra time to evaluate your workspace."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Trial extended by 7 days</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we extended your trial so your team can complete setup and evaluate results
        calmly.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Extension', value: extension ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Continue trial" />
    </LifecycleLayout>
  );
}

export default TrialExtended;
