import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface TaskAssignedProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  recipientName: string;
  assignerName: string;
  taskName: string;
  dueDate?: string;
  priority?: string;
  taskUrl: string;
}

/**
 * Task assigned notification template for the Beacon theme.
 */
export function TaskAssigned({
  brand = beaconBrand,
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
      preview={`Assigned: ${taskName}`}
    >
      <EmailEyebrow>Assignment</EmailEyebrow>
      <EmailHeading subtitle={`From ${assignerName}`}>{taskName}</EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, a new task was added to your queue. Review the details below and mark it
        in progress when you start.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Assigned by', value: assignerName },
          ...(dueDate ? [{ label: 'Due date', value: dueDate }] : []),
          ...(priority ? [{ label: 'Priority', value: priority }] : []),
        ]}
      />
      <EmailCtaSection
        href={taskUrl}
        label="Open task"
        caption="Update status or leave a note for your team."
      />
    </EmailLayout>
  );
}

export default TaskAssigned;
