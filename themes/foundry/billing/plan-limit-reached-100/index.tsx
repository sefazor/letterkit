import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface PlanLimitReached100Props {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  usage?: string;
  actionUrl?: string;
}

export function PlanLimitReached100({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  usage,
  actionUrl,
}: PlanLimitReached100Props) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your included monthly quota is fully consumed."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Plan limit reached</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — you reached 100% of plan capacity. Upgrade to continue high-volume
        operations.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[{ label: 'Usage', badge: usage ?? '', badgeVariant: 'danger' }]}
      />
      <LifecycleCta href={actionUrl} label="Upgrade plan" />
    </LifecycleLayout>
  );
}

export default PlanLimitReached100;
