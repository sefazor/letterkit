import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface TaskAssignedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  taskName?: string;
  dueDate?: string;
  priority?: string;
  actionUrl?: string;
}

export function TaskAssigned({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  taskName,
  dueDate,
  priority,
  actionUrl,
}: TaskAssignedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={taskName ? `You were assigned: ${taskName}.` : 'A new task was assigned to you.'}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Task assigned to you</LifecycleTitle>
      <LifecycleLede>Hi {userName} — a new task is now under your ownership.</LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Task', value: taskName ?? '' },
          { label: 'Due date', value: dueDate ?? '' },
          {
            label: 'Priority',
            badge: priority ?? '',
            badgeVariant: priority?.toLowerCase() === 'high' ? 'danger' : 'warning',
          },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Open task" />
    </LifecycleLayout>
  );
}

export default TaskAssigned;
