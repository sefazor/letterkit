import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface DeadlineReminderProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  recipientName: string;
  taskName: string;
  dueIn: string;
  dueDate: string;
  taskUrl: string;
}

/**
 * Deadline reminder notification template for the Grundy theme.
 */
export function DeadlineReminder({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  recipientName,
  taskName,
  dueIn,
  dueDate,
  taskUrl,
}: DeadlineReminderProps) {
  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Due ${dueIn}: ${taskName}`}
      headerTagline="Activity"
    >
      <EmailEyebrow>Deadline reminder</EmailEyebrow>
      <EmailHeading subtitle={`Due ${dueIn}`}>
        {taskName}
      </EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, this is a friendly reminder that your task is coming up. Make sure
        everything is on track before the deadline.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Task', value: taskName },
          { label: 'Due in', value: dueIn },
          { label: 'Due date', value: dueDate },
        ]}
      />
      <EmailCtaSection
        href={taskUrl}
        label="Review task"
        caption="Mark complete or request an extension from the task page."
      />
    </EmailLayout>
  );
}

export default DeadlineReminder;
