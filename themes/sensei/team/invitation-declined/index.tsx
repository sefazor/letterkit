import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface InvitationDeclinedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function InvitationDeclined({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: InvitationDeclinedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="An invitee declined your workspace invitation."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Invitation declined</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — the invitation was declined. You can resend later with a different role if
        needed.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Manage invitations" />
    </LifecycleLayout>
  );
}

export default InvitationDeclined;
