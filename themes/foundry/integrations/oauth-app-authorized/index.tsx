import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface OauthAppAuthorizedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  oauthAppName?: string;
  actionUrl?: string;
}

export function OauthAppAuthorized({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  oauthAppName,
  actionUrl,
}: OauthAppAuthorizedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A third-party app received access to your workspace data."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>OAuth app authorized</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — authorization completed. You can revoke access anytime from security
        settings.
      </LifecycleLede>
      {oauthAppName ? (
        <LifecycleDataCard rows={[{ label: 'App', value: oauthAppName }]} />
      ) : null}
      <LifecycleCta href={actionUrl} label="Review app permissions" />
    </LifecycleLayout>
  );
}

export default OauthAppAuthorized;
