import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { senseiBrand } from '../../brand.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { formatLifecycleDate } from '../../_components/lifecycle/format-date';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleSecurityNote } from '../../_components/lifecycle/security-note';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';

export interface AccountDeletionRequestedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  workspaceName: string;
  recipientEmail: string;
  requestedAt: Date | string;
  gracePeriod: string;
  cancelUrl?: string;
  secureAccountUrl?: string;
  supportUrl?: string;
}

export function AccountDeletionRequested({
  brand = senseiBrand,
  tokens,
  userName,
  workspaceName,
  recipientEmail,
  requestedAt,
  gracePeriod,
  cancelUrl,
  secureAccountUrl,
  supportUrl,
}: AccountDeletionRequestedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={`Deletion requested for ${workspaceName}`}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Account deletion requested</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we&apos;ve logged your request to delete{' '}
        <LifecycleStrong>{workspaceName}</LifecycleStrong>. You can
        still recover your account during the grace period below.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Status', badge: 'Pending', badgeVariant: 'warning' },
          { label: 'Workspace', value: workspaceName },
          { label: 'Requested', value: formatLifecycleDate(requestedAt) },
          { label: 'Grace period', value: gracePeriod },
        ]}
      />
      <LifecycleCta href={cancelUrl} label="Cancel deletion" />
      <LifecycleSecurityNote secureAccountUrl={secureAccountUrl} supportUrl={supportUrl} />
    </LifecycleLayout>
  );
}

export default AccountDeletionRequested;
