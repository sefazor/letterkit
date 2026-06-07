import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface SyncCompletedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  recordsImported?: string;
  warnings?: string;
  actionUrl?: string;
}

export function SyncCompleted({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  recordsImported,
  warnings,
  actionUrl,
}: SyncCompletedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Latest sync finished with no blocking errors."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Integration sync completed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — data sync completed and records are now up to date.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Records imported', value: recordsImported ?? '' },
          { label: 'Warnings', value: warnings ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="View sync log" />
    </LifecycleLayout>
  );
}

export default SyncCompleted;
