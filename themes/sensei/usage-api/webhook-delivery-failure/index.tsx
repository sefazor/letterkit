import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface WebhookDeliveryFailureProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  endpoint?: string;
  lastStatus?: string;
  actionUrl?: string;
}

export function WebhookDeliveryFailure({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  endpoint,
  lastStatus,
  actionUrl,
}: WebhookDeliveryFailureProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Could not deliver events to your endpoint."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Webhook delivery failed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — multiple webhook retries failed with error responses from your endpoint.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Endpoint', value: endpoint ?? '' },
          {
            label: 'Last status',
            badge: lastStatus ?? '',
            badgeVariant: 'danger',
          },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Inspect webhook logs" />
    </LifecycleLayout>
  );
}

export default WebhookDeliveryFailure;
