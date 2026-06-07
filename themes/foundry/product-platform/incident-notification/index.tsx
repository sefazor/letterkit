import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface IncidentNotificationProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  currentImpact?: string;
  actionUrl?: string;
}

export function IncidentNotification({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  currentImpact,
  actionUrl,
}: IncidentNotificationProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="We identified elevated latency on API requests."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Incident detected</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — our team is actively investigating an incident impacting part of the
        platform.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Status', badge: 'Investigating', badgeVariant: 'danger' },
          { label: 'Current impact', value: currentImpact ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Follow live updates" />
    </LifecycleLayout>
  );
}

export default IncidentNotification;
