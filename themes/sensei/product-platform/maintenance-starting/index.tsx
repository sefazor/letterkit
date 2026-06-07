import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface MaintenanceStartingProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function MaintenanceStarting({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: MaintenanceStartingProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Entering planned maintenance mode."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Maintenance starting now</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — maintenance has started. Some write operations may be delayed temporarily.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[{ label: 'Status', badge: 'In progress', badgeVariant: 'warning' }]}
      />
      <LifecycleCta href={actionUrl} label="Track status" />
    </LifecycleLayout>
  );
}

export default MaintenanceStarting;
