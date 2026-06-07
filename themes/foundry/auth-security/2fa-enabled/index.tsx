import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleList } from '../../_components/lifecycle/list';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface TwoFaEnabledProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  twoFaUrl?: string;
}

export function TwoFaEnabled({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  twoFaUrl,
}: TwoFaEnabledProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Two-factor authentication is now active."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Two-factor authentication enabled</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — two-factor authentication is on. Your account is significantly harder to
        compromise.
      </LifecycleLede>
      <LifecycleList
        items={[
          'Sign-ins now require your authenticator app',
          'Save your recovery codes somewhere safe',
          'Existing sessions stay active until you sign out',
        ]}
      />
      <LifecycleCta href={twoFaUrl} label="Manage 2FA settings" />
    </LifecycleLayout>
  );
}

export default TwoFaEnabled;
