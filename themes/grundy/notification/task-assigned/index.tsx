import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface TaskAssignedProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  recipientName: string;
  assignerName: string;
  taskName: string;
  dueDate?: string;
  priority?: string;
  taskUrl: string;
}

/**
 * Task assigned notification template for the Grundy theme.
 */
export function TaskAssigned({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  recipientName,
  assignerName,
  taskName,
  dueDate,
  priority,
  taskUrl,
}: TaskAssignedProps) {
  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`${assignerName} assigned you: ${taskName}`}
      headerTagline="Activity"
    >
      <EmailEyebrow>Task assigned</EmailEyebrow>
      <EmailHeading subtitle={`Assigned by ${assignerName}`}>
        {taskName}
      </EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, {assignerName} assigned a task to you. Open it below to see details and
        get started.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Task', value: taskName },
          ...(dueDate ? [{ label: 'Due date', value: dueDate }] : []),
          ...(priority ? [{ label: 'Priority', value: priority }] : []),
        ]}
      />
      <EmailCtaSection
        href={taskUrl}
        label="Open task"
        caption="Update status or add a comment from the task page."
      />
    </EmailLayout>
  );
}

export default TaskAssigned;
