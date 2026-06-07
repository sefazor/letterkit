import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface InvitationExpiredProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function InvitationExpired({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: InvitationExpiredProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A pending invitation reached its expiry date."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Team invitation expired</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — the invitation expired after 7 days. Create a new invite to continue.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Send new invitation" />
    </LifecycleLayout>
  );
}

export default InvitationExpired;
