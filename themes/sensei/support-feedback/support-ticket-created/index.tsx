import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface SupportTicketCreatedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  ticketId?: string;
  priority?: string;
  actionUrl?: string;
}

export function SupportTicketCreated({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  ticketId,
  priority,
  actionUrl,
}: SupportTicketCreatedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={ticketId ? `Your request ${ticketId} is received.` : 'Your support request is received.'}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Support ticket created</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we got your request and assigned it to our support queue.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Ticket ID', value: ticketId ?? '' },
          {
            label: 'Priority',
            badge: priority ?? '',
            badgeVariant: priority?.toLowerCase() === 'high' ? 'danger' : 'neutral',
          },
        ]}
      />
      <LifecycleCta href={actionUrl} label="View ticket" />
    </LifecycleLayout>
  );
}

export default SupportTicketCreated;
