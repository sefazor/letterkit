import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { foundryBrand } from '../../brand.config';

export interface IntegrationFailedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  integrationName?: string;
  actionUrl?: string;
}

export function IntegrationFailed({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  integrationName,
  actionUrl,
}: IntegrationFailedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Could not establish integration authorization."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>
        {integrationName ? `${integrationName} connection failed` : 'Connection failed'}
      </LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — initial connection to{' '}
        {integrationName ? (
          <LifecycleStrong>{integrationName}</LifecycleStrong>
        ) : (
          'the integration'
        )}{' '}
        failed due to invalid token scope.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[{ label: 'Status', badge: 'Failed', badgeVariant: 'danger' }]}
      />
      <LifecycleCta href={actionUrl} label="Retry connection" />
      <LifecycleFootnote>
        Check OAuth scopes and admin permissions before retry.
      </LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default IntegrationFailed;
