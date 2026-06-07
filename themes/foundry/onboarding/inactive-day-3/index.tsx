import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface InactiveDay3Props {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function InactiveDay3({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: InactiveDay3Props) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your workspace has been quiet for 3 days."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Need a hand getting started?</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — if setup felt busy, we can help. A quick starter wizard will configure your
        first use case in minutes.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Open starter wizard" />
    </LifecycleLayout>
  );
}

export default InactiveDay3;
