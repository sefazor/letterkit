import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { senseiBrand } from '../../brand.config';

export interface IntegrationDisconnectedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  integrationName?: string;
  actionUrl?: string;
}

export function IntegrationDisconnected({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  integrationName,
  actionUrl,
}: IntegrationDisconnectedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={
        integrationName
          ? `${integrationName} was disconnected from your workspace.`
          : 'An integration was disconnected.'
      }
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>
        {integrationName ? `${integrationName} disconnected` : 'Integration disconnected'}
      </LifecycleTitle>
      <LifecycleLede>
        Hi {userName} —{' '}
        {integrationName ? (
          <LifecycleStrong>{integrationName}</LifecycleStrong>
        ) : (
          'The integration'
        )}{' '}
        was disconnected and related automations may pause.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[{ label: 'Status', badge: 'Disconnected', badgeVariant: 'neutral' }]}
      />
      <LifecycleCta href={actionUrl} label="Reconnect integration" />
    </LifecycleLayout>
  );
}

export default IntegrationDisconnected;
