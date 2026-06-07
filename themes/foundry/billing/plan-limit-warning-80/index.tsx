import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface PlanLimitWarning80Props {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  currentUsage?: string;
  actionUrl?: string;
}

export function PlanLimitWarning80({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  currentUsage,
  actionUrl,
}: PlanLimitWarning80Props) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Usage is approaching your plan threshold."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>You reached 80% of your plan limit</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your current month usage is close to your included limit.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          {
            label: 'Current usage',
            badge: currentUsage ?? '',
            badgeVariant: 'warning',
          },
        ]}
      />
      <LifecycleCta href={actionUrl} label="View usage report" />
    </LifecycleLayout>
  );
}

export default PlanLimitWarning80;
