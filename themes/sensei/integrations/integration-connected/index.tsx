import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { senseiBrand } from '../../brand.config';

export interface IntegrationConnectedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  integrationName?: string;
  actionUrl?: string;
}

export function IntegrationConnected({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  integrationName,
  actionUrl,
}: IntegrationConnectedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={
        integrationName
          ? `${integrationName} is now connected to your workspace.`
          : 'Integration connected to your workspace.'
      }
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>
        {integrationName ? `${integrationName} connected` : 'Integration connected'}
      </LifecycleTitle>
      <LifecycleLede>
        Hi {userName} —{' '}
        {integrationName ? (
          <LifecycleStrong>{integrationName}</LifecycleStrong>
        ) : (
          'Your integration'
        )}{' '}
        is connected and data syncing is active.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[{ label: 'Status', badge: 'Connected', badgeVariant: 'success' }]}
      />
      <LifecycleCta href={actionUrl} label="Manage integrations" />
    </LifecycleLayout>
  );
}

export default IntegrationConnected;
