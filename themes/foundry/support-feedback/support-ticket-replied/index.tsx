import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface SupportTicketRepliedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  ticketId?: string;
  actionUrl?: string;
}

export function SupportTicketReplied({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  ticketId,
  actionUrl,
}: SupportTicketRepliedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={ticketId ? `A new reply is available on ${ticketId}.` : 'Support replied to your ticket.'}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Support replied to your ticket</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — our support team posted an update and may need your confirmation.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Ticket ID', value: ticketId ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Read reply" />
    </LifecycleLayout>
  );
}

export default SupportTicketReplied;
