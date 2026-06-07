import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface UsageCapWarningProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  usagePercent?: string;
  used?: string;
  limit?: string;
  actionUrl?: string;
}

export function UsageCapWarning({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  usagePercent,
  used,
  limit,
  actionUrl,
}: UsageCapWarningProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="You consumed 85% of your monthly API quota."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>API usage warning</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your API usage is near the monthly cap. Consider upgrading to avoid
        throttling.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          {
            label: 'Usage',
            badge: usagePercent ?? '',
            badgeVariant: 'warning',
          },
          { label: 'Used', value: used ?? '' },
          { label: 'Limit', value: limit ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Review API usage" />
    </LifecycleLayout>
  );
}

export default UsageCapWarning;
