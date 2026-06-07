import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import type { AtlasBadgeVariant } from '../../_components/lifecycle/tokens';
import { senseiBrand } from '../../brand.config';

function decisionVariant(decision?: string): AtlasBadgeVariant {
  if (decision?.toLowerCase() === 'rejected') return 'danger';
  if (decision?.toLowerCase() === 'granted') return 'success';
  return 'neutral';
}

export interface ApprovalGrantedRejectedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  decision?: string;
  subject?: string;
  actionUrl?: string;
}

export function ApprovalGrantedRejected({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  decision,
  subject,
  actionUrl,
}: ApprovalGrantedRejectedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A pending approval changed status."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Approval status updated</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — the requested approval has been resolved and logged in activity history.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          {
            label: 'Decision',
            badge: decision ?? '',
            badgeVariant: decisionVariant(decision),
          },
          { label: 'Subject', value: subject ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="View decision log" />
    </LifecycleLayout>
  );
}

export default ApprovalGrantedRejected;
