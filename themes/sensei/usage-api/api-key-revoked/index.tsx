import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface ApiKeyRevokedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  keyPrefix?: string;
  actionUrl?: string;
}

export function ApiKeyRevoked({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  keyPrefix,
  actionUrl,
}: ApiKeyRevokedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="An API key has been revoked and cannot be used anymore."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>API key revoked</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — revocation completed. Requests signed with this key now return authorization
        errors.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Key prefix', value: keyPrefix ?? '' },
          { label: 'Status', badge: 'Revoked', badgeVariant: 'danger' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Create replacement key" />
    </LifecycleLayout>
  );
}

export default ApiKeyRevoked;
