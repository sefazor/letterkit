import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { senseiBrand } from '../../brand.config';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { formatLifecycleDate } from '../../_components/lifecycle/format-date';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';

export interface AccountPermanentlyDeletedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  workspaceName: string;
  recipientEmail: string;
  deletedAt: Date | string;
}

export function AccountPermanentlyDeleted({
  brand = senseiBrand,
  tokens,
  userName,
  workspaceName,
  recipientEmail,
  deletedAt,
}: AccountPermanentlyDeletedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={`${workspaceName} has been permanently deleted`}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Account permanently deleted</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — as requested,{' '}
        <LifecycleStrong>{workspaceName}</LifecycleStrong> and all
        associated data were permanently erased. Backups containing personal data were deleted per
        our retention policy.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Status', badge: 'Closed', badgeVariant: 'neutral' },
          { label: 'Workspace', value: workspaceName },
          { label: 'Deleted', value: formatLifecycleDate(deletedAt) },
        ]}
      />
    </LifecycleLayout>
  );
}

export default AccountPermanentlyDeleted;
