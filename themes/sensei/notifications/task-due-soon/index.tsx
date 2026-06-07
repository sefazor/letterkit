import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface TaskDueSoonProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  dueIn?: string;
  taskName?: string;
  actionUrl?: string;
}

export function TaskDueSoon({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  dueIn,
  taskName,
  actionUrl,
}: TaskDueSoonProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="One of your tasks is due soon."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Task due soon</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — friendly reminder to complete the assigned task before the deadline.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Task', value: taskName ?? '' },
          { label: 'Due in', badge: dueIn ?? '', badgeVariant: 'warning' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Review due tasks" />
    </LifecycleLayout>
  );
}

export default TaskDueSoon;
