import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface SupportTicketResolvedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  ticketId?: string;
  actionUrl?: string;
}

export function SupportTicketResolved({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  ticketId,
  actionUrl,
}: SupportTicketResolvedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={ticketId ? `${ticketId} is marked resolved.` : 'Your support ticket is resolved.'}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Support ticket resolved</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we marked your ticket as resolved. Reopen anytime if the issue persists.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Ticket ID', value: ticketId ?? '' },
          { label: 'Status', badge: 'Resolved', badgeVariant: 'success' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Review resolution" />
    </LifecycleLayout>
  );
}

export default SupportTicketResolved;
