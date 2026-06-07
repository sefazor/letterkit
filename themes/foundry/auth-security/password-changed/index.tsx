import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface PasswordChangedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  securityUrl?: string;
  changeSource?: string;
  ipAddress?: string;
  location?: string;
  changedAt?: string;
}

export function PasswordChanged({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  securityUrl,
  changeSource,
  ipAddress,
  location,
  changedAt,
}: PasswordChangedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your password was just changed."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Password changed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your password was changed from a signed-in session. If you made this change,
        you&apos;re all set.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Source', value: changeSource ?? '' },
          { label: 'IP address', value: ipAddress ?? '' },
          { label: 'Location', value: location ?? '' },
          { label: 'Time', value: changedAt ?? '' },
        ]}
      />
      <LifecycleCta href={securityUrl} label="Secure my account" />
      <LifecycleFootnote>
        Didn&apos;t make this change? Reset your password and sign out other sessions.
      </LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default PasswordChanged;
