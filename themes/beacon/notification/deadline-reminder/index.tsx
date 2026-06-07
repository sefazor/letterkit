import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface DeadlineReminderProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  recipientName: string;
  taskName: string;
  dueIn: string;
  dueDate: string;
  taskUrl: string;
}

/**
 * Deadline reminder notification template for the Beacon theme.
 */
export function DeadlineReminder({
  brand = beaconBrand,
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
    >
      <EmailEyebrow>Due soon</EmailEyebrow>
      <EmailHeading subtitle={taskName}>Deadline in {dueIn}</EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, this task is approaching its due date. Confirm status or request more time
        before it slips.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Due date', value: dueDate },
          { label: 'Time left', value: dueIn },
          { label: 'Task', value: taskName },
        ]}
      />
      <EmailCtaSection
        href={taskUrl}
        label="Review task"
        caption="Mark complete or reassign from the task page."
      />
    </EmailLayout>
  );
}

export default DeadlineReminder;
