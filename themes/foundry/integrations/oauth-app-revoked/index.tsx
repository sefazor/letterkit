import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface OauthAppRevokedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  oauthAppName?: string;
  actionUrl?: string;
}

export function OauthAppRevoked({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  oauthAppName,
  actionUrl,
}: OauthAppRevokedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Third-party app access was removed."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>OAuth app access revoked</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — the app can no longer access your workspace data.
      </LifecycleLede>
      {oauthAppName ? (
        <LifecycleDataCard rows={[{ label: 'App', value: oauthAppName }]} />
      ) : null}
      <LifecycleCta href={actionUrl} label="Manage connected apps" />
    </LifecycleLayout>
  );
}

export default OauthAppRevoked;
