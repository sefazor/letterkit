import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface WorkspaceOwnershipTransferredProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  newOwner?: string;
  workspaceName?: string;
  actionUrl?: string;
}

export function WorkspaceOwnershipTransferred({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  newOwner,
  workspaceName,
  actionUrl,
}: WorkspaceOwnershipTransferredProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Ownership moved to a new primary admin."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Workspace ownership transferred</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — ownership transfer is complete and billing authority moved to the new owner.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Workspace', value: workspaceName ?? '' },
          { label: 'New owner', value: newOwner ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Review owner settings" />
    </LifecycleLayout>
  );
}

export default WorkspaceOwnershipTransferred;
