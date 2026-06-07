import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface SyncFailedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  integrationName?: string;
  actionUrl?: string;
}

export function SyncFailed({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  integrationName,
  actionUrl,
}: SyncFailedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Could not complete the scheduled sync run."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Integration sync failed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — sync failed due to authentication expiry. Reconnect to resume imports.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Integration', value: integrationName ?? '' },
          { label: 'Status', badge: 'Sync failed', badgeVariant: 'danger' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Fix integration" />
    </LifecycleLayout>
  );
}

export default SyncFailed;
