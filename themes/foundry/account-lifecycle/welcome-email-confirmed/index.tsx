import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { foundryBrand } from '../../brand.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';

export interface WelcomeEmailConfirmedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail: string;
  dashboardUrl: string;
}

export function WelcomeEmailConfirmed({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  dashboardUrl,
}: WelcomeEmailConfirmedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your email is confirmed — full access unlocked"
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Email confirmed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your email is verified. Billing, security settings, and team invites are now
        fully available.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Status', badge: 'Verified', badgeVariant: 'success' },
          { label: 'Email', value: recipientEmail },
          { label: 'Access', value: 'Full' },
        ]}
      />
      <LifecycleCta href={dashboardUrl} label="Go to dashboard" />
    </LifecycleLayout>
  );
}

export default WelcomeEmailConfirmed;
