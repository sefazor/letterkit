import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { senseiBrand } from '../../brand.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { formatLifecycleDate } from '../../_components/lifecycle/format-date';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';

export interface AccountSuspendedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  workspaceName: string;
  recipientEmail: string;
  suspendedAt: Date | string;
  reason: string;
  supportUrl?: string;
}

export function AccountSuspended({
  brand = senseiBrand,
  tokens,
  userName,
  workspaceName,
  recipientEmail,
  suspendedAt,
  reason,
  supportUrl,
}: AccountSuspendedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={`Access to ${workspaceName} is temporarily restricted`}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Account suspended</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — access to{' '}
        <LifecycleStrong>{workspaceName}</LifecycleStrong> is
        temporarily restricted. Contact us and we&apos;ll help restore it quickly.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Status', badge: 'Suspended', badgeVariant: 'danger' },
          { label: 'Workspace', value: workspaceName },
          { label: 'Suspended', value: formatLifecycleDate(suspendedAt) },
          { label: 'Reason', value: reason },
        ]}
      />
      <LifecycleCta href={supportUrl} label="Contact support" />
    </LifecycleLayout>
  );
}

export default AccountSuspended;
