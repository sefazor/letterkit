import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { senseiBrand } from '../../brand.config';

export interface SsoConfiguredProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  ssoUrl?: string;
  provider?: string;
  domain?: string;
  enforcement?: string;
}

export function SsoConfigured({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  ssoUrl,
  provider,
  domain,
  enforcement,
}: SsoConfiguredProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="SSO is now active for your workspace."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Single sign-on enabled</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — single sign-on is live.
        {provider ? (
          <>
            {' '}
            Your team can authenticate through{' '}
            <LifecycleStrong>{provider}</LifecycleStrong>.
          </>
        ) : null}
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Provider', value: provider ?? '' },
          { label: 'Domain', value: domain ?? '' },
          { label: 'Enforcement', value: enforcement ?? '' },
        ]}
      />
      {provider ? (
        <LifecycleLede>
          Users matching this policy will be redirected to {provider} on their next login.
        </LifecycleLede>
      ) : null}
      <LifecycleCta href={ssoUrl} label="Open SSO settings" />
    </LifecycleLayout>
  );
}

export default SsoConfigured;
