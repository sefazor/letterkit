import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface ApiKeyCreatedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  keyPrefix?: string;
  scopes?: string;
  actionUrl?: string;
}

export function ApiKeyCreated({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  keyPrefix,
  scopes,
  actionUrl,
}: ApiKeyCreatedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A new API credential was generated in your workspace."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>New API key created</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — store this key securely and restrict it with scopes and IP allowlists.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Key prefix', value: keyPrefix ?? '' },
          { label: 'Scopes', value: scopes ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Manage API keys" />
    </LifecycleLayout>
  );
}

export default ApiKeyCreated;
