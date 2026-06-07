import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface MemberRemovedProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  adminName: string;
  memberName: string;
  memberEmail: string;
  workspaceName: string;
  removedBy: string;
  teamUrl: string;
}

/**
 * Member removed admin notification template for the Grundy theme.
 */
export function MemberRemoved({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  adminName,
  memberName,
  memberEmail,
  workspaceName,
  removedBy,
  teamUrl,
}: MemberRemovedProps) {
  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`${memberName} removed from ${workspaceName}`}
      headerTagline="Team"
    >
      <EmailEyebrow>Member removed</EmailEyebrow>
      <EmailHeading subtitle={workspaceName}>
        Team member removed
      </EmailHeading>
      <EmailBodyText>
        Hi {adminName}, {memberName} has been removed from {workspaceName}. They no longer have
        access to shared projects or files.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Member', value: memberName },
          { label: 'Email', value: memberEmail },
          { label: 'Removed by', value: removedBy },
          { label: 'Workspace', value: workspaceName },
        ]}
      />
      <EmailCtaSection
        href={teamUrl}
        label="Audit member actions"
        caption="Review recent activity from this member in the audit log."
      />
    </EmailLayout>
  );
}

export default MemberRemoved;
