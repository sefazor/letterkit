import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface CreditsExpiringProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  expiringAmount?: string;
  actionUrl?: string;
}

export function CreditsExpiring({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  expiringAmount,
  actionUrl,
}: CreditsExpiringProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Some of your credits expire this month."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Credits expiring soon</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — use your credits before expiry so you do not lose value.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          {
            label: 'Expiring amount',
            badge: expiringAmount ?? '',
            badgeVariant: 'warning',
          },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Review expiring credits" />
    </LifecycleLayout>
  );
}

export default CreditsExpiring;
