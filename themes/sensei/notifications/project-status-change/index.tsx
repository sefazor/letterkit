import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface ProjectStatusChangeProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  projectName?: string;
  newStatus?: string;
  actionUrl?: string;
}

export function ProjectStatusChange({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  projectName,
  newStatus,
  actionUrl,
}: ProjectStatusChangeProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={
        projectName && newStatus
          ? `Project "${projectName}" moved to ${newStatus}.`
          : 'A project status changed.'
      }
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Project status changed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — a tracked project changed status and may require follow-up from your team.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Project', value: projectName ?? '' },
          {
            label: 'New status',
            badge: newStatus ?? '',
            badgeVariant: 'neutral',
          },
        ]}
      />
      <LifecycleCta href={actionUrl} label="View project" />
    </LifecycleLayout>
  );
}

export default ProjectStatusChange;
