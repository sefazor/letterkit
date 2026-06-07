import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface DataDeletionConfirmationProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  userName: string;
  workspaceName: string;
  deletionDate: string;
  cancelUrl: string;
  supportEmail?: string;
}

/**
 * Data deletion scheduled confirmation template for the Beacon theme.
 */
export function DataDeletionConfirmation({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  userName,
  workspaceName,
  deletionDate,
  cancelUrl,
  supportEmail,
}: DataDeletionConfirmationProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Account deletion scheduled for ${deletionDate}`}
    >
      <EmailEyebrow>Deletion scheduled</EmailEyebrow>
      <EmailHeading subtitle="This action is reversible until the deadline">
        Your account deletion is scheduled
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, we received your request to delete your {appName} account and all data
        associated with {workspaceName}. Deletion is scheduled for the date below.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Status', value: 'Scheduled' },
          { label: 'Workspace', value: workspaceName },
          { label: 'Deletion date', value: deletionDate },
          { label: 'Reversible', value: 'Yes — until deletion date' },
        ]}
      />
      <EmailCallout title="Changed your mind?">
        You can cancel this deletion anytime before {deletionDate}. After that, all data will be
        permanently removed and cannot be recovered.
      </EmailCallout>
      <EmailCtaSection
        href={cancelUrl}
        label="Cancel deletion"
        caption="Your account and data will remain intact."
      />
    </EmailLayout>
  );
}

export default DataDeletionConfirmation;
