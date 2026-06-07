import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface WebhookRestoredProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  endpoint?: string;
  actionUrl?: string;
}

export function WebhookRestored({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  endpoint,
  actionUrl,
}: WebhookRestoredProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Event deliveries are healthy again."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Webhook delivery restored</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your endpoint is responding correctly and normal webhook delivery has
        resumed.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Endpoint', value: endpoint ?? '' },
          { label: 'Status', badge: 'Healthy', badgeVariant: 'success' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="View delivery timeline" />
    </LifecycleLayout>
  );
}

export default WebhookRestored;
