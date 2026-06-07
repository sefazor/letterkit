import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface InvitationAcceptedAdminProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  memberName?: string;
  actionUrl?: string;
}

export function InvitationAcceptedAdmin({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  memberName,
  actionUrl,
}: InvitationAcceptedAdminProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A teammate accepted your invitation."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Invitation accepted</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your invitation was accepted and the member now has workspace access.
      </LifecycleLede>
      {memberName ? (
        <LifecycleDataCard rows={[{ label: 'New member', value: memberName }]} />
      ) : null}
      <LifecycleCta href={actionUrl} label="Review team members" />
    </LifecycleLayout>
  );
}

export default InvitationAcceptedAdmin;
