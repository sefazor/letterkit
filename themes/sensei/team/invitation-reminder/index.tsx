import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface InvitationReminderProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function InvitationReminder({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: InvitationReminderProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A reminder was sent for a pending team invite."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Invitation reminder sent</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we sent a friendly reminder so your teammate can join the workspace.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="View pending invites" />
    </LifecycleLayout>
  );
}

export default InvitationReminder;
