import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface MaintenanceScheduledProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  maintenanceWindow?: string;
  actionUrl?: string;
}

export function MaintenanceScheduled({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  maintenanceWindow,
  actionUrl,
}: MaintenanceScheduledProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A maintenance window is planned."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Scheduled maintenance notice</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we scheduled platform maintenance to improve reliability and query
        performance.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Window', value: maintenanceWindow ?? '' }]} />
      <LifecycleCta href={actionUrl} label="View maintenance details" />
    </LifecycleLayout>
  );
}

export default MaintenanceScheduled;
