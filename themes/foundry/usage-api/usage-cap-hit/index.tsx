import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface UsageCapHitProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function UsageCapHit({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: UsageCapHitProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your API quota is fully consumed for this cycle."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>API usage cap reached</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — you reached the monthly limit. New requests may be rate-limited until reset.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[{ label: 'Quota', badge: '100%', badgeVariant: 'danger' }]}
      />
      <LifecycleCta href={actionUrl} label="Upgrade API plan" />
    </LifecycleLayout>
  );
}

export default UsageCapHit;
