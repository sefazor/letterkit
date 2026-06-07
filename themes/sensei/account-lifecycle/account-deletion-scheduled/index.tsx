import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { senseiBrand } from '../../brand.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleSecurityNote } from '../../_components/lifecycle/security-note';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';

export interface AccountDeletionScheduledProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  workspaceName: string;
  recipientEmail: string;
  deletionDate: string;
  cancelUrl?: string;
  secureAccountUrl?: string;
  supportUrl?: string;
}

export function AccountDeletionScheduled({
  brand = senseiBrand,
  tokens,
  userName,
  workspaceName,
  recipientEmail,
  deletionDate,
  cancelUrl,
  secureAccountUrl,
  supportUrl,
}: AccountDeletionScheduledProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={`${workspaceName} is scheduled for permanent removal`}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Deletion scheduled</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — all data in{' '}
        <LifecycleStrong>{workspaceName}</LifecycleStrong> will be
        permanently removed on the date below unless you cancel.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Status', badge: 'Scheduled', badgeVariant: 'warning' },
          { label: 'Workspace', value: workspaceName },
          { label: 'Deletion date', value: deletionDate },
          { label: 'Reversible', value: 'Until then' },
        ]}
      />
      <LifecycleCta href={cancelUrl} label="Cancel deletion" />
      <LifecycleSecurityNote secureAccountUrl={secureAccountUrl} supportUrl={supportUrl} />
    </LifecycleLayout>
  );
}

export default AccountDeletionScheduled;
