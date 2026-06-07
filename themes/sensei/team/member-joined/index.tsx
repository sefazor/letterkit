import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { senseiBrand } from '../../brand.config';

export interface MemberJoinedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  memberName?: string;
  workspaceName?: string;
  actionUrl?: string;
}

export function MemberJoined({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  memberName,
  workspaceName,
  actionUrl,
}: MemberJoinedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={
        memberName && workspaceName
          ? `${memberName} joined ${workspaceName}.`
          : 'A new member joined your workspace.'
      }
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>New member joined workspace</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} —{' '}
        {memberName ? (
          <LifecycleStrong>{memberName}</LifecycleStrong>
        ) : (
          'A new member'
        )}{' '}
        joined your workspace and can now collaborate on shared projects.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Member', value: memberName ?? '' },
          { label: 'Workspace', value: workspaceName ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Open team directory" />
    </LifecycleLayout>
  );
}

export default MemberJoined;
