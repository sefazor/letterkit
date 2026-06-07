import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { foundryBrand } from '../../brand.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { formatLifecycleDate } from '../../_components/lifecycle/format-date';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';

export interface AccountReactivatedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  workspaceName: string;
  recipientEmail: string;
  reactivatedAt: Date | string;
  workspaceUrl: string;
}

export function AccountReactivated({
  brand = foundryBrand,
  tokens,
  userName,
  workspaceName,
  recipientEmail,
  reactivatedAt,
  workspaceUrl,
}: AccountReactivatedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={`Welcome back to ${workspaceName}`}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Account reactivated</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} —{' '}
        <LifecycleStrong>{workspaceName}</LifecycleStrong> is active
        again. All features and data are available.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Status', badge: 'Active', badgeVariant: 'success' },
          { label: 'Workspace', value: workspaceName },
          { label: 'Restored', value: formatLifecycleDate(reactivatedAt) },
        ]}
      />
      <LifecycleCta href={workspaceUrl} label="Open workspace" />
    </LifecycleLayout>
  );
}

export default AccountReactivated;
