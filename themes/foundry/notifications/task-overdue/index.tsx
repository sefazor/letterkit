import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface TaskOverdueProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  overdueBy?: string;
  taskName?: string;
  actionUrl?: string;
}

export function TaskOverdue({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  overdueBy,
  taskName,
  actionUrl,
}: TaskOverdueProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A task assigned to you is past due."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Task is overdue</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — please update status or complete the task to keep project timelines
        healthy.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Task', value: taskName ?? '' },
          { label: 'Overdue by', badge: overdueBy ?? '', badgeVariant: 'danger' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Resolve overdue task" />
    </LifecycleLayout>
  );
}

export default TaskOverdue;
