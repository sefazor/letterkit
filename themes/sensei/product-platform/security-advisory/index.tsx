import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface SecurityAdvisoryProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  advisoryId?: string;
  actionUrl?: string;
}

export function SecurityAdvisory({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  advisoryId,
  actionUrl,
}: SecurityAdvisoryProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A security patch and guidance have been released."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Security advisory</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — a vulnerability was mitigated. Please review recommended tenant
        configuration updates.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Advisory', value: advisoryId ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Review advisory" />
    </LifecycleLayout>
  );
}

export default SecurityAdvisory;
