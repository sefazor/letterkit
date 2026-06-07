import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { foundryBrand } from '../../brand.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { formatLifecycleDate } from '../../_components/lifecycle/format-date';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleSecurityNote } from '../../_components/lifecycle/security-note';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';

export interface AccountDeletionCancelledProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  workspaceName: string;
  recipientEmail: string;
  cancelledAt: Date | string;
  cancelledBy: string;
  returnUrl?: string;
  secureAccountUrl?: string;
  supportUrl?: string;
}

export function AccountDeletionCancelled({
  brand = foundryBrand,
  tokens,
  userName,
  workspaceName,
  recipientEmail,
  cancelledAt,
  cancelledBy,
  returnUrl,
  secureAccountUrl,
  supportUrl,
}: AccountDeletionCancelledProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={`Scheduled deletion of ${workspaceName} has been cancelled`}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Workspace deletion cancelled</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — the scheduled deletion of{' '}
        <LifecycleStrong>{workspaceName}</LifecycleStrong> has been
        cancelled. No further action is required from you.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Status', badge: 'Active', badgeVariant: 'success' },
          { label: 'Workspace', value: workspaceName },
          { label: 'Cancelled', value: formatLifecycleDate(cancelledAt) },
          { label: 'Cancelled by', value: cancelledBy },
        ]}
      />
      <LifecycleCta href={returnUrl} label="Return to workspace" />
      <LifecycleSecurityNote secureAccountUrl={secureAccountUrl} supportUrl={supportUrl} />
    </LifecycleLayout>
  );
}

export default AccountDeletionCancelled;
