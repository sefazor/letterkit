import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface QuotaResetProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function QuotaReset({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: QuotaResetProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your API allowance has been refreshed for the new cycle."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Quota reset complete</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — monthly counters are reset and full request capacity is available again.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[{ label: 'Status', badge: 'Reset', badgeVariant: 'success' }]}
      />
      <LifecycleCta href={actionUrl} label="View new quota" />
    </LifecycleLayout>
  );
}

export default QuotaReset;
