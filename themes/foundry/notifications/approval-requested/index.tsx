import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { foundryBrand } from '../../brand.config';

export interface ApprovalRequestedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  requesterName?: string;
  subject?: string;
  actionUrl?: string;
}

export function ApprovalRequested({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  requesterName,
  subject,
  actionUrl,
}: ApprovalRequestedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={
        requesterName && subject
          ? `${requesterName} requested approval on "${subject}".`
          : 'An approval was requested.'
      }
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Approval requested</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} —{' '}
        {requesterName ? (
          <LifecycleStrong>{requesterName}</LifecycleStrong>
        ) : (
          'A teammate'
        )}{' '}
        is waiting for your decision
        {subject ? (
          <>
            {' '}
            on{' '}
            <LifecycleStrong>&ldquo;{subject}&rdquo;</LifecycleStrong>
          </>
        ) : null}
        .
      </LifecycleLede>
      <LifecycleDataCard
        rows={[{ label: 'Status', badge: 'Pending', badgeVariant: 'warning' }]}
      />
      <LifecycleCta href={actionUrl} label="Review request" />
    </LifecycleLayout>
  );
}

export default ApprovalRequested;
