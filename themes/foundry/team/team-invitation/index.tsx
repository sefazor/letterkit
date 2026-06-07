import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { foundryBrand } from '../../brand.config';

export interface TeamInvitationProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  workspaceName?: string;
  role?: string;
  inviterName?: string;
  actionUrl?: string;
}

export function TeamInvitation({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  workspaceName,
  role,
  inviterName,
  actionUrl,
}: TeamInvitationProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={
        inviterName
          ? `${inviterName} invited you to collaborate.`
          : 'You are invited to join a workspace.'
      }
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>
        {workspaceName ? `You are invited to ${workspaceName}` : 'You are invited to a workspace'}
      </LifecycleTitle>
      <LifecycleLede>
        Hi {userName} —{' '}
        {inviterName ? (
          <LifecycleStrong>{inviterName}</LifecycleStrong>
        ) : (
          'A teammate'
        )}{' '}
        invited you to join{' '}
        {workspaceName ? (
          <LifecycleStrong>&ldquo;{workspaceName}&rdquo;</LifecycleStrong>
        ) : (
          'a workspace'
        )}
        {role ? ` as ${role}` : ''}.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Workspace', value: workspaceName ?? '' },
          { label: 'Role', value: role ?? '' },
          { label: 'Invited by', value: inviterName ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Accept invitation" />
    </LifecycleLayout>
  );
}

export default TeamInvitation;
