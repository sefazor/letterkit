import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { foundryBrand } from '../../brand.config';

export interface WorkspaceDeletedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  workspaceName?: string;
}

export function WorkspaceDeleted({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  workspaceName,
}: WorkspaceDeletedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={
        workspaceName
          ? `${workspaceName} was deleted.`
          : 'A workspace was deleted.'
      }
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Workspace deleted</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} —{' '}
        {workspaceName ? (
          <LifecycleStrong>&ldquo;{workspaceName}&rdquo;</LifecycleStrong>
        ) : (
          'The workspace'
        )}{' '}
        was deleted and all members lost access immediately.
      </LifecycleLede>
      <LifecycleFootnote>Deletion is permanent after retention grace period.</LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default WorkspaceDeleted;
