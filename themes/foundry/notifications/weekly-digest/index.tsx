import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface WeeklyDigestProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  workflowsRun?: string;
  resolvedTasks?: string;
  openBlockers?: string;
  actionUrl?: string;
}

export function WeeklyDigest({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  workflowsRun,
  resolvedTasks,
  openBlockers,
  actionUrl,
}: WeeklyDigestProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A full week recap from your workspace."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Your weekly digest</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — weekly snapshot is ready with productivity metrics and unresolved items.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Workflows run', value: workflowsRun ?? '' },
          { label: 'Resolved tasks', value: resolvedTasks ?? '' },
          { label: 'Open blockers', value: openBlockers ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="See full weekly report" />
    </LifecycleLayout>
  );
}

export default WeeklyDigest;
