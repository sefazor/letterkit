import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface CreditsAddedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  creditBalance?: string;
  actionUrl?: string;
}

export function CreditsAdded({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  creditBalance,
  actionUrl,
}: CreditsAddedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Credits are now available for future invoices."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Credits added to your account</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — credits were added and will automatically apply to upcoming billing cycles.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'New credit balance', value: creditBalance ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Open credit balance" />
    </LifecycleLayout>
  );
}

export default CreditsAdded;
