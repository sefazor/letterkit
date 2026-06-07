import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface RoleChangedProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  recipientName: string;
  memberName: string;
  workspaceName: string;
  previousRole: string;
  newRole: string;
  changedBy: string;
  teamUrl: string;
}

/**
 * Role changed notification template for the Beacon theme.
 */
export function RoleChanged({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  recipientName,
  memberName,
  workspaceName,
  previousRole,
  newRole,
  changedBy,
  teamUrl,
}: RoleChangedProps) {
  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`${memberName}'s role changed to ${newRole}`}
    >
      <EmailEyebrow>Role update</EmailEyebrow>
      <EmailHeading subtitle={workspaceName}>
        Role updated
      </EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, {changedBy} updated {memberName}&apos;s role in {workspaceName}. The new
        permissions take effect immediately.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Member', value: memberName },
          { label: 'Previous role', value: previousRole },
          { label: 'New role', value: newRole },
          { label: 'Changed by', value: changedBy },
        ]}
      />
      <EmailCtaSection
        href={teamUrl}
        label="View role matrix"
        caption="See what each role can access in your workspace."
      />
    </EmailLayout>
  );
}

export default RoleChanged;
