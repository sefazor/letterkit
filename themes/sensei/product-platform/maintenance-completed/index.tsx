import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface MaintenanceCompletedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function MaintenanceCompleted({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: MaintenanceCompletedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="All services are fully operational again."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Maintenance completed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — scheduled maintenance completed successfully and normal performance is
        restored.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[{ label: 'Status', badge: 'Operational', badgeVariant: 'success' }]}
      />
      <LifecycleCta href={actionUrl} label="See incident timeline" />
    </LifecycleLayout>
  );
}

export default MaintenanceCompleted;
